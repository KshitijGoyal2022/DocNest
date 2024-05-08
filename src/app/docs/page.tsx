import HeroSection from '@/components/hero-section';

const DocumentationHomePage = () => {
  return (
    <div className='last:'>
      <div className='bg-white px-6 py-24 sm:py-32 lg:px-8'>
        <div className='mx-auto max-w-2xl text-center'>
          <p className='text-base font-semibold leading-7 text-sky-600'>
            Get the help you need
          </p>
          <h2 className='mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl'>
            Verosoft Design Documentation Center
          </h2>
          <p className='mt-6 text-lg leading-8 text-gray-600'>
            A centralized hub for essential guides, manuals, and resources,
            supporting effective knowledge sharing and learning across the
            organization.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DocumentationHomePage;
