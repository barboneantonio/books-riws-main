import scrapy
from datetime import datetime

# scrapy crawl books

class BooksSpider(scrapy.Spider):
    # identifica el spider
    name = "books"
    baseURL = "https://www.bookdepository.com"

    # Método que genera una petición a la página inicial
    def start_requests(self):
        urlPrincipal = ['https://www.bookdepository.com/es/']
        for url in urlPrincipal:
            yield scrapy.Request(url=url, callback=self.getCategories)

    # Método para acceder a la lista de categorías
    def getCategories(self, response):

        urlCategories = response.css('.top-category > a::attr(href)').getall()
        # del urlCategories[:-5]

        for url in urlCategories:
            yield scrapy.Request(url=self.baseURL + url + '/browse/viewmode/all', callback=self.getBooks)

    # Método para obtener los enlaces a cada libro en cada categoría
    def getBooks(self, response):
        # de cada subcategoría se extraen datos de libros
        urlBooks = response.css('.book-item .item-info .title a::attr(href)').getall()

        del urlBooks[:-20]

        for url in urlBooks:
            yield scrapy.Request(url=self.baseURL + url, callback=self.parse)

        pagina = response.css('.right-content > .pagination > .next > a::attr(href)').get()
        if pagina is not None:
            yield scrapy.Request(url=self.baseURL + pagina, callback=self.getBooks)

    # Este método es donde se guardan los items
    def parse(self, response):
        # obtenemos los campos necesarios de la página
        name = response.css('.item-info [itemprop="name"]::text').get().strip()
        linkImage = response.css('.item-img-content img::attr(src)').get()
        category = response.css('.category-footer > li a::text').getall()
        newCategory = []
        for i in category:
            newCategory.append(i.strip())
        date = datetime.strptime(response.css('[itemprop="datePublished"]::text').get().strip(), "%d %b %Y").date()
        publisher = response.css('[itemprop="publisher"] > a > span::text').get().strip()
        isbn = response.css('[itemprop="isbn"]::text').get()
        pages = response.css('[itemprop="numberOfPages"]::text').get().split()[0]
        author = response.css('[itemprop="author"] a span::text').get().strip()
        description = response.css('[itemprop="description"]::text').getall()
        newDescription = ""
        for i in description:
            newDescription += '\n'.join(' '.join(line.split()) for line in i.split('\n'))

        return {
            'isbn': isbn,
            'book': {
                'name': name,
                'author': author,
                'linkImage': linkImage,
                'category': newCategory,
                'date': date,
                'publisher': publisher,
                'pages': pages,
                'description': newDescription
            }
        }
