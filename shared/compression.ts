import * as pako from 'pako';

/**
 * Compress a string using gzip and encode as base64 URL-safe string
 */
export function compressText(text: string): string {
  try {
    // Convert string to Uint8Array
    const textBytes = new TextEncoder().encode(text);
    
    // Compress using gzip
    const compressed = pako.gzip(textBytes);
    
    // Convert to base64 and make URL-safe
    const base64 = btoa(String.fromCharCode(...Array.from(compressed)));
    return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  } catch (error) {
    console.error('Compression failed:', error);
    // Fallback to regular URL encoding if compression fails
    return encodeURIComponent(text);
  }
}

/**
 * Decompress a base64 URL-safe string back to original text
 */
export function decompressText(compressed: string): string {
  try {
    // Restore base64 padding and characters
    let base64 = compressed.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    
    // Convert base64 to bytes
    const compressedBytes = new Uint8Array(
      atob(base64).split('').map(char => char.charCodeAt(0))
    );
    
    // Decompress using gzip
    const decompressed = pako.ungzip(compressedBytes);
    
    // Convert back to string
    return new TextDecoder().decode(decompressed);
  } catch (error) {
    console.error('Decompression failed:', error);
    // Fallback to regular URL decoding if decompression fails
    return decodeURIComponent(compressed);
  }
}