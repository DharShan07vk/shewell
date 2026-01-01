/* eslint-disable @next/next/no-img-element */

import React from 'react';
import Link from 'next/link';

const AppFooter = () => {
  return (
    <div className="layout-footer">
      <img src={`/layout/images/vyan-logo.png`} alt="Logo" height="20" className="mr-2" />
      by
      <Link href="https://nextflytech.com">
        <span className="font-medium ml-2">Nextfly Technologies</span>
      </Link>
    </div>
  );
};

export default AppFooter;
