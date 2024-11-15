import "server-only";

//NOT NEEDED

export async function extractAndSetCookies(
  responseHeaders: string[],
  cookies: any
) {
  responseHeaders.forEach((cookieStr) => {
    const [cookieNameAndValue, ...cookieAttributes] = cookieStr.split(";");
    const [name, value] = cookieNameAndValue
      .split("=")
      .map((part) => part.trim());
    const expiresAt = cookieAttributes
      .find((attr) => attr.trim().startsWith("Expires"))
      ?.split("=")[1]
      ?.trim();
    const expires = expiresAt
      ? new Date(expiresAt)
      : new Date(Date.now() + 15 * 60 * 1000);

    const cookieOptions = {
      path: "/",
      sameSite: "lax",
      httpOnly: cookieAttributes.some((attr) => attr.trim() === "HttpOnly"),
      secure: cookieAttributes.some((attr) => attr.trim() === "Secure"),
      expires,
    };

    const pathAttr = cookieAttributes.find((attr) =>
      attr.trim().startsWith("Path")
    );
    if (pathAttr) {
      cookieOptions.path = pathAttr.split("=")[1]?.trim() || "/";
    }

    cookies.set(name, value, cookieOptions);
  });
}
