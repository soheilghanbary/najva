import type { SVGProps } from 'react';

export const LoadingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} {...props}>
    <path
      d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 19a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z"
      opacity={0.25}
    />
    <path d="M10.14 1.16a11 11 0 0 0-9 8.92A1.59 1.59 0 0 0 2.46 12a1.52 1.52 0 0 0 1.65-1.3 8 8 0 0 1 6.66-6.61A1.42 1.42 0 0 0 12 2.69a1.57 1.57 0 0 0-1.86-1.53Z">
      <animateTransform
        attributeName="transform"
        dur="0.75s"
        repeatCount="indefinite"
        type="rotate"
        values="0 12 12;360 12 12"
      />
    </path>
  </svg>
);

export const LogoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" {...props}>
    <linearGradient
      id="a"
      x1={10.341}
      x2={40.798}
      y1={8.312}
      y2={38.769}
      gradientUnits="userSpaceOnUse"
    >
      <stop offset={0} stopColor="#2aa4f4" />
      <stop offset={1} stopColor="#007ad9" />
    </linearGradient>
    <path
      fill="url(#a)"
      d="M46.105 11.02a17.56 17.56 0 0 1-4.979 1.362 8.65 8.65 0 0 0 3.812-4.758 17.395 17.395 0 0 1-5.502 2.082A8.653 8.653 0 0 0 33.122 7c-4.783 0-8.661 3.843-8.661 8.582 0 .671.079 1.324.226 1.958A24.678 24.678 0 0 1 6.838 8.566a8.482 8.482 0 0 0-1.172 4.322c0 2.979 1.525 5.602 3.851 7.147a8.798 8.798 0 0 1-3.926-1.072v.101c0 4.163 2.986 7.63 6.944 8.419a8.617 8.617 0 0 1-2.276.308 9.204 9.204 0 0 1-1.632-.158c1.102 3.402 4.299 5.889 8.087 5.963A17.499 17.499 0 0 1 5.958 37.27c-.701 0-1.387-.04-2.065-.122A24.75 24.75 0 0 0 17.171 41c15.927 0 24.641-13.079 24.641-24.426 0-.372-.012-.742-.029-1.108a17.032 17.032 0 0 0 4.322-4.446"
    />
  </svg>
);
