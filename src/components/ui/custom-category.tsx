const CustomCategory = ({
  categoryLink,
  setCategoryLink,
  categoriesLinks,
}: {
  categoryLink: string;
  setCategoryLink: React.Dispatch<React.SetStateAction<string>>;
  categoriesLinks: { id: string; name: string }[];
}) => {
  return (
    <article className="w-full mb-4 border-b border-b-gray-300 flex justify-start gap-x-6 items-center  my-2">
      <button
        onClick={() => setCategoryLink(categoriesLinks[0].id)}
        className={
          categoryLink === categoriesLinks[0].id
            ? "bg-inherit text-black border-b-2 border-b-black font-semibold"
            : "bg-inherit text-black"
        }
      >
        {categoriesLinks[0].name}
      </button>
      <button
        onClick={() => setCategoryLink(categoriesLinks[1].id)}
        className={
          categoryLink === categoriesLinks[1].id
            ? "bg-inherit text-black border-b-2 border-b-black font-semibold"
            : "bg-inherit text-black"
        }
      >
        {categoriesLinks[1].name}
      </button>
    </article>
  );
};

export default CustomCategory;
