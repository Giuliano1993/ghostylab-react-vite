type ButtonProps = {
    href: string;
    text: string;
  }

type Project = {
    id?: number,
    name: string,
    description: string,
    link: string,
    image: string,
    public: boolean
}

type Article = {
    id?: number,
    title: string,
    content: string,
    tags?: string,
    public: boolean,
    newsletter: boolean
}
type ProjectLineProps = {
    project: Project,
    onChange: ()=>void
}

type SkillBoxProps = {
    skill: string
}

interface ProjectInterface {
  all: (publicOnly?: boolean) => Promise<Array<Project>>;
  get: (id: number) => Promise<Project | null>;
  create: (data: Project) => Promise<Project | null>;
  update: (id: number, data: Project) => Promise<boolean | null>;
  delete: (id: number) => Promise<boolean | null>;
}

interface ArticleInterface {
  all: (publicOnly?: boolean) => Promise<Array<Article>>;
  get: (id: number) => Promise<Article | null>;
  create: (data: Article) => Promise<Article | null>;
  update: (id: number, data: Article) => Promise<boolean | null>;
  delete: (id: number) => Promise<boolean | null>;
}