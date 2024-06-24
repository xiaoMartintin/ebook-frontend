import { Card } from "antd";
import { Link } from "react-router-dom";
import "../css/BookCard.css";

const { Meta } = Card;

export default function BookCard({ book }) {
    return (
        <Link to={`/book/${book.id}`}>
            <Card
                hoverable
                cover={<img alt={book.title} src={book.cover} />}
                className="book-card"
            >
                <Meta
                    title={<p className="book-title">{book.title}</p>}
                    description={(
                        <div className="book-card-meta">
                            <p className="book-author">{`Author: ${book.author}`}</p>
                            <p className="book-price">{`Price: $${book.price}`}</p>
                            <p className="book-isbn">{`ISBN: ${book.isbn}`}</p>
                            <div className="book-sales-inventory">
                                <span className="book-sales">{`Sales: ${book.sales}`}</span>
                                <span className="book-inventory">{`Inventory: ${book.inventory}`}</span>
                            </div>
                        </div>
                    )}
                />
            </Card>
        </Link>
    );
}
