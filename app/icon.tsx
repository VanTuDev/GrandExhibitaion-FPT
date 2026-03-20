import { ImageResponse } from 'next/og';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#12100c',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#c9a84c',
          border: '1px solid rgba(201,168,76,.4)',
          borderRadius: 4,
        }}
      >
        F
      </div>
    ),
    { ...size }
  );
}
