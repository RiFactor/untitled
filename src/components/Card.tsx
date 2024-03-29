// import Image from "./Image";
// import Link from "./Link";

interface IProps {
  title: string;
  description: string;
}

const Card = ({ title, description }: IProps) => (
  <div className="md p-4 md:w-1/2" style={{ maxWidth: "544px" }}>
    <div className={` overflow-hidden rounded-md border-2 border-gray-200 border-opacity-60 dark:border-gray-700`}>
      <div className="p-6">
        <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">{title}</h2>
        <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">{description}</p>
      </div>
    </div>
  </div>
);

export default Card;
