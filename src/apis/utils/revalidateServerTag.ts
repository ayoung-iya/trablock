'use server';

import { revalidateTag } from 'next/cache';

export default async function revalidateServerTag(tag: string) {
  revalidateTag(tag);
}
