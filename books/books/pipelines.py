from elasticsearch import Elasticsearch


class BooksPipeline:
    def __init__(self):
        self.es = Elasticsearch(['http://localhost:9200'])
        self.es.indices.create(index='book', ignore=400)
        self.es.indices.put_mapping(
            index='book',
            body={
                "properties": {
                    "name": {
                        "type": "text"
                    },
                    "author": {
                        "type": "keyword"
                    },
                    "linkImage": {
                        "type": "text"
                    },
                    "category": {
                        "type": "text"
                    },
                    "date": {
                        "type": "date"
                    },
                    "publisher": {
                        "type": "text"
                    },
                    "isbn": {
                        "type": "text"
                    },
                    "pages": {
                        "type": "text"
                    },
                    "description": {
                        "type": "text"
                    }
                }
            }
        )

    def process_item(self, item, spider):
        self.es.create(index='book', id=item['isbn'], document=item['book'])
        return item
