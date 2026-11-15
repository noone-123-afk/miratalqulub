import type { User } from '../firebase';

export const AUTHORIZED_OWNER_EMAIL = 'one497303@gmail.com';

export async function downloadOwnerProtectedZip(
  endpoint: '/api/download-cloudflare-zip' | '/api/download-source-zip',
  filename: string,
  user: User | null | undefined
): Promise<void> {
  if (
    !user ||
    !user.email ||
    user.email.toLowerCase() !== AUTHORIZED_OWNER_EMAIL.toLowerCase() ||
    !user.emailVerified
  ) {
    throw new Error('غير مصرح: هذا التحميل مخصص لحساب المالك الموثق فقط (one497303@gmail.com).');
  }

  const idToken = await user.getIdToken(true);
  const response = await fetch(endpoint, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  if (!response.ok) {
    let errorMessage = 'فشل التحقق من صلاحيات المالك لتحميل الحزمة.';
    try {
      const errJson = await response.json();
      if (errJson?.error) errorMessage = errJson.error;
    } catch {
      // ignore non-json
    }
    throw new Error(errorMessage);
  }

  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = objectUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(objectUrl), 4000);
}
