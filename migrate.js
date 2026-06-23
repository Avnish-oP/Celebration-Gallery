import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screensDir = path.join(__dirname, 'src', 'screens');
const appDir = path.join(__dirname, 'src', 'app');

const filesToMigrate = [
  { file: 'HomeScreen.tsx', dest: 'page.tsx', route: '' },
  { file: 'ContactScreen.tsx', dest: 'contact/page.tsx', route: 'contact' },
  { file: 'PackagesScreen.tsx', dest: 'packages/page.tsx', route: 'packages' },
  { file: 'DeepDiveScreen.tsx', dest: 'deep-dive/page.tsx', route: 'deep-dive' },
  { file: 'BookingScreen.tsx', dest: 'booking/page.tsx', route: 'booking' },
  { file: 'GalleryScreen.tsx', dest: 'gallery/page.tsx', route: 'gallery' }
];

filesToMigrate.forEach(({ file, dest, route }) => {
  const filePath = path.join(screensDir, file);
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf-8');

  // Add Next.js imports
  content = content.replace(/import \{ Screen[^}]*\} from '\.\.\/types';/, `import { useRouter, useSearchParams } from 'next/navigation';\nimport { BIRTHDAY_PACKAGES, BirthdayPackage, GalleryItem, GALLERY_ITEMS, BookingData } from '../types';`);
  
  // Clean up unused imports manually if needed, but let's just make sure useRouter is imported.
  if (!content.includes('next/navigation')) {
    content = `import { useRouter, useSearchParams } from 'next/navigation';\n` + content;
  }

  // Remove navigate prop interfaces
  content = content.replace(/interface [a-zA-Z]+Props \{[\s\S]*?navigate:[\s\S]*?\}/g, '');
  
  // Fix deep dive and booking props
  if (file === 'DeepDiveScreen.tsx') {
    content = content.replace(/export default function DeepDiveScreen\([^)]*\) \{/, 'export default function DeepDiveScreen() {\n  const router = useRouter();\n  const searchParams = useSearchParams();\n  const selectedPackageId = searchParams?.get("packageId") || "neon-birthday-bash";\n');
  } else if (file === 'BookingScreen.tsx') {
    content = content.replace(/export default function BookingScreen\([^)]*\) \{/, 'export default function BookingScreen() {\n  const router = useRouter();\n  const searchParams = useSearchParams();\n  const packageIdParam = searchParams?.get("packageId");\n  const dateParam = searchParams?.get("date");\n  const locationParam = searchParams?.get("location");\n  const bookingPreset = packageIdParam ? { packageId: packageIdParam, date: dateParam || "", location: locationParam || "" } : null;\n  const setBookingPreset = () => {};\n');
  } else if (file === 'PackagesScreen.tsx') {
    content = content.replace(/export default function PackagesScreen\([^)]*\) \{/, 'export default function PackagesScreen() {\n  const router = useRouter();\n  const setSelectedPackageId = (id: string) => router.push(`/deep-dive?packageId=${id}`);\n');
  } else if (file === 'GalleryScreen.tsx') {
    content = content.replace(/export default function GalleryScreen\([^)]*\) \{/, 'export default function GalleryScreen() {\n  const router = useRouter();\n  const setSelectedPackageId = (id: string) => router.push(`/deep-dive?packageId=${id}`);\n');
  } else {
    // Standard replacement
    content = content.replace(/export default function ([A-Za-z]+)\(\{[^}]*\}\) \{/, 'export default function $1() {\n  const router = useRouter();');
  }

  // Replace navigate calls
  content = content.replace(/navigate\('home',\s*'[^']*'\)/g, "router.push('/')");
  content = content.replace(/navigate\('packages',\s*'[^']*'\)/g, "router.push('/packages')");
  // HomeScreen deep_dive is Neon Bash
  if (file === 'HomeScreen.tsx') {
    content = content.replace(/navigate\('deep_dive',\s*'[^']*'\)/g, "router.push('/deep-dive?packageId=neon-birthday-bash')");
  } else if (file === 'PackagesScreen.tsx' || file === 'GalleryScreen.tsx') {
    content = content.replace(/navigate\('deep_dive',\s*'[^']*'\)/g, ""); // Handled by setSelectedPackageId
  } else {
    content = content.replace(/navigate\('deep_dive',\s*'[^']*'\)/g, "router.push('/deep-dive')");
  }
  content = content.replace(/navigate\('booking',\s*'[^']*'\)/g, "router.push('/booking')");
  content = content.replace(/navigate\('gallery',\s*'[^']*'\)/g, "router.push('/gallery')");
  content = content.replace(/navigate\('contact',\s*'[^']*'\)/g, "router.push('/contact')");

  // Deep Dive to booking mapping
  if (file === 'DeepDiveScreen.tsx') {
     content = content.replace(/setBookingPreset\([^;]*\);/g, "");
     content = content.replace(/navigate\('booking',\s*'slide_up'\);/g, "router.push(`/booking?packageId=${pkg.id}&date=${date || new Date().toISOString().split('T')[0]}&location=${location}`);");
  }

  // Use "use client"
  content = `"use client";\n` + content;

  // Create destination dir
  const destPath = path.join(appDir, dest);
  const destDirPath = path.dirname(destPath);
  fs.mkdirSync(destDirPath, { recursive: true });
  fs.writeFileSync(destPath, content);
});

console.log('Migration complete!');
