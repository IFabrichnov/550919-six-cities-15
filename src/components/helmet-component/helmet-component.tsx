import { Helmet } from 'react-helmet-async';

type THelmetComponent = {
  title: string;
  description: string;
};

function HelmetComponent({ title, description }: THelmetComponent): JSX.Element {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
    </Helmet>
  );
}

export default HelmetComponent;
