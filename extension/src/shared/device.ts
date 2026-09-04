export function getDeviceId(): string {
  const existingId = localStorage.getItem('chatWrappedDeviceId');
  if (existingId) {
    return existingId;
  }
  const newId = crypto.randomUUID();
  localStorage.setItem('chatWrappedDeviceId', newId);
  return newId;
}

export function getCreatorName(): string | null {
  return localStorage.getItem('chatWrappedCreatorName');
}

export function setCreatorName(name: string): void {
  localStorage.setItem('chatWrappedCreatorName', name.trim());
}
