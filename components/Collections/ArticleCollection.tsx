
export const ArticleCollection = ({ collection }: any) => {
    return (
        <div className="bg-white shadow rounded">
            <ul className="divide-y divide-gray-200">
                {collection.map((article: any) =>
                    <li>
                        <a href="" className="block hove:bg-gray-100">
                            <div className="p-4">
                                {article.title}
                            </div>
                        </a>
                    </li>)}
            </ul>
        </div>
    );
}