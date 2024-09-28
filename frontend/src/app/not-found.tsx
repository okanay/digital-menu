"use client";

export const dynamic = "force-dynamic";

import Error from "next/error";

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
