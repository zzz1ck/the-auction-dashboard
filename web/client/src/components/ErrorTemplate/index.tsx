export default function ErrorTemplate({
  message = 'We cannot get data due to mess with connection!',
  description = 'Don\'t worry, it\'s happening time to time. Please check your network connection and try again.',
}: {
  message?: string;
  description?: string;
}): JSX.Element {
  return (
    <div tw="flex flex-col items-center justify-center w-full">
      <p tw="mb-2">
        <span tw="text-2xl">🙊</span>
        <span tw="text-6xl px-1">🙈</span>
        <span tw="text-2xl">🙉</span>
      </p>
      {message && <p tw="text-red-600">{message}</p>}
      {description && <p tw="text-xs text-gray-600 dark:text-gray-200">{description}</p>}
    </div>
  );
}