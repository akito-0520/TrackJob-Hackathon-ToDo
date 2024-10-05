export function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  try {
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  } catch (e) {
    console.error("Invalid Base64 string:", e);
    return new Uint8Array();
  }
}

// ArrayBufferをBase64文字列に変換するヘルパー関数
export function arrayBufferToBase64(buffer: ArrayBuffer | null): string {
  if (!buffer) return "";
  return btoa(
    String.fromCharCode.apply(
      null,
      new Uint8Array(buffer) as unknown as number[]
    )
  );
}
