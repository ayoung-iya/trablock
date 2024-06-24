import { cookies } from 'next/headers';

export default function getAuthToken() {
  const cookieStore = cookies();
  return cookieStore.get('authorization-token')?.value || '';
}
