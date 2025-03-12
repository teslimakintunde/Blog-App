import CardList from "@/components/cardlist/CardList";
import Menu from "@/components/menu/Menu";

type BlogPageProps = {
  searchParams: {
    page?: string;
    cat?: string;
  };
};

const BlogPage: React.FC<BlogPageProps> = ({ searchParams }) => {
  const page = parseInt(searchParams.page || "1", 10);
  const { cat } = searchParams;
  return (
    <section className="container font-roboto">
      <div className="bg-red-400 py-2 rounded-sm text-white text-3xl text-center">
        <h1 className="font-bold ">Style Blogs</h1>
      </div>
      <div className="grid grid-cols-6">
        <CardList page={page} cat={cat} />
        <Menu />
      </div>
    </section>
  );
};

export default BlogPage;
