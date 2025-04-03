import React, { useEffect } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

type Props = {
  imageSrc?: string;
  title?: string;
  description?: string;
};

function FullPageLoader(props: Props) {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col justify-center items-center z-50 overflow-hidden">
      <Card className="border-none shadow-none bg-transparent text-center">
        <CardHeader>
          {props.title && <CardTitle>{props.title}</CardTitle>}
          {props.description && (
            <CardDescription>{props.description}</CardDescription>
          )}
        </CardHeader>
        <CardContent className="flex justify-center">
          {props.imageSrc ? (
            <img src={props.imageSrc} alt="Page loader" />
          ) : (
            <div className="animate-spin rounded-full border-t-4 border-b-4 border-blue-500 w-16 h-16"></div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default FullPageLoader;
