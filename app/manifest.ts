import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tazcal — Your Health. Planned by AI.',
    short_name: 'Tazcal',
    description:
      'A premium AI-powered Health Operating System that connects nutrition, planning, habits, goals, journaling, and analytics.',
    start_url: '/',
    display: 'standalone',
    background_color: '#071426',
    theme_color: '#0A84FF',
    icons: [
      {
        src: './public/images/icon.jpg',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
