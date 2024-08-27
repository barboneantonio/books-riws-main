import './App.css';
import ElasticsearchAPIConnector from "@elastic/search-ui-elasticsearch-connector";
import React from "react";
import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch
} from "@elastic/react-search-ui";
import {
  BooleanFacet,
  Layout,
  SingleLinksFacet,
  SingleSelectFacet
} from "@elastic/react-search-ui-views";
import "@elastic/react-search-ui-views/lib/styles/styles.css";

const connector = new ElasticsearchAPIConnector({
  host: "http://localhost:9200", // host url for the Elasticsearch instance
  index: "book", // index name where the search documents are contained
});

const config = {
  alwaysSearchOnInitialLoad: true,
  apiConnector: connector,
  hasA11yNotifications: true,
  searchQuery: {
    result_fields: {
      name: {
        snippet: {
          fallback: true
        }
      },
      author: {
        snippet: {
          fallback: true
        }
      },
      category: {
        snippet: {
          fallback: true
        }
      },
      date: { raw: {} },
      publisher: { raw: {} },
      pages: { raw: {} },
      linkImage: { raw: {} },
    },
    search_fields: {
      name: {},
      author: {},
      category: {}
    },
    disjunctiveFacets: ["name.keyword", "category.keyword", "author.keyword"],
    facets: {
      "name.keyword": { type: "value" },
      "category.keyword": { type: "value" },
      "author.keyword": { type: "value" },
    }
  },
}


export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched }) => ({
          wasSearched
        })}
      >
        {({ wasSearched }) => {
          return (
            <div className="App">
  <ErrorBoundary>
    <Layout
      header={
        <SearchBox
          autocompleteMinimumCharacters={3}
          autocompleteResults={{
            linkTarget: "_blank",
            sectionTitle: "Results",
            titleField: "name",
            urlField: "url",
            shouldTrackClickThrough: true
          }}
          autocompleteSuggestions={true}
          debounceLength={0}
        />
      }
      sideContent={
        <div>
          {wasSearched && <Sorting label={"Sort by"} sortOptions={[]} />}
          <Facet key={"1"} field={"name.keyword"} label={"name"} />
          <Facet key={"2"} field={"category.keyword"} label={"category"} />
          <Facet key={"3"} field={"author.keyword"} label={"author"} />
          <Facet key={"4"} field={"date"} label={"date"} />
        </div>
      }
      bodyContent={<Results shouldTrackClickThrough={true} />}
      bodyHeader={
        <React.Fragment>
          {wasSearched && <PagingInfo />}
          {wasSearched && <ResultsPerPage />}
        </React.Fragment>
      }
      bodyFooter={<Paging />}
    />
  </ErrorBoundary>
</div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}