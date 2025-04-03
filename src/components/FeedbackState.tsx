import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  title: string;
  description: string;
  actionText?: string;
  onAction?(): void;
  imageSrc: string;
};

export default function FeedbackState(
  props: Props = {
    title: "No Data Available",
    description: "There is nothing to show here yet. Try adding some data.",
    imageSrc: "/empty-state-illustration.png",
  }
) {
  return (
    <Card className="flex flex-col items-center justify-center text-center p-6 border-none shadow-none animate-fade-up">
      <CardContent className="flex flex-col items-center gap-4">
        <img src={props.imageSrc} alt="Empty state" width={150} height={150} />
        <div>
          <h2 className="text-lg font-semibold text-gray-700">{props.title}</h2>
          <p className="text-sm text-gray-500">{props.description}</p>
        </div>
        {props.actionText && props.onAction && (
          <Button onClick={props.onAction}>{props.actionText}</Button>
        )}
      </CardContent>
    </Card>
  );
}
