import CardList from "@/components/cardlist/CardList";
import Menu from "@/components/menu/Menu";

type BlogPageProps = {
  searchParams: Promise<{ page?: string; cat?: string }>;
};

const BlogPage = async ({ searchParams }: BlogPageProps) => {
  const params = await searchParams; // ✅ Await searchParams before using it

  const page = parseInt(params.page || "1", 10);
  const cat = params.cat || "";

  return (
    <section className="container font-roboto">
      <div className="pt-[100px] md:pt-[70px]">
        <div className="py-3 bg-red-400 md:my-20 text-white text-center rounded-sm">
          <h1 className="font-bold text-xl capitalize">{cat} Blogs</h1>
        </div>
        <div className="flex flex-row justify-between items-start">
          <CardList page={page} cat={cat} />
          <Menu />
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
