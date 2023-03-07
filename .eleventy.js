const {DateTime} = require("luxon");

const tags = require('./tags.cjs');

var lodashChunk = require("lodash.chunk");

module.exports = function(eleventyConfig) {

    eleventyConfig.addPassthroughCopy('./src/main.css');
    eleventyConfig.addPassthroughCopy('./src/blog.css');
    eleventyConfig.addPassthroughCopy('./src/main.js');
    eleventyConfig.addPassthroughCopy('./src/assets');

    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    });

    // Get the first `n` elements of a collection.
  eleventyConfig.addFilter("head", (array, n) => {
    if(!Array.isArray(array) || array.length === 0) {
      return [];
    }
    if( n < 0 ) {
      return array.slice(n);
    }
    return array.slice(0, n);
  });

  // Return the smallest number argument
  eleventyConfig.addFilter("min", (...numbers) => {
    return Math.min.apply(null, numbers);
  });

    eleventyConfig.addFilter('series', function(collection, series) {
        if (!series) return collection;
          const filtered = collection.filter(item => item.data.series == series)
          return filtered;
      });

      eleventyConfig.addCollection("tagList", collection => {
        const tagsSet = new Set();
        collection.getAll().forEach(item => {
          if (!item.data.tags) return;
          item.data.tags
            .filter(tag => !['post', 'all'].includes(tag))
            .forEach(tag => tagsSet.add(tag));
        });
        return Array.from(tagsSet).sort();
      });
    
      //double pagination

      eleventyConfig.addCollection("doublePagination", function(collection) {
        // Get unique list of tags
        let tagSet = new Set();
        collection.getAllSorted().map(function(item) {
            if( "tags" in item.data ) {
                let tags = item.data.tags;
    
                // optionally filter things out before you iterate over?
                for (let tag of tags) {
                    tagSet.add(tag);
                }
    
            }
        });
    
        // Get each item that matches the tag
        let paginationSize = 5;
        let tagMap = [];
        let tagArray = [...tagSet];
        for( let tagName of tagArray) {
            let tagItems = collection.getFilteredByTag(tagName);
            let pagedItems = lodashChunk(tagItems.reverse(), paginationSize);
            // console.log( tagName, tagItems.length, pagedItems.length );
            for( let pageNumber = 0, max = pagedItems.length; pageNumber < max; pageNumber++) {
                tagMap.push({
                    tagName: tagName,
                    pageNumber: pageNumber,
                    pageData: pagedItems[pageNumber]
                });
            }
        }
        console.log( tagMap );
        return tagMap;
    });

    eleventyConfig.addFilter('getDate', time.getDate);

    eleventyConfig.addFilter('tagIsPublic', tags.isPublic);
    eleventyConfig.addFilter('publicTags', tags.publicTags);
    eleventyConfig.addFilter('getTags', tags.getTags);
    eleventyConfig.addFilter('tagData', tags.tagData);
    eleventyConfig.addFilter('displayName', tags.displayName);
    eleventyConfig.addFilter('tagLink', tags.tagLink);
  
    eleventyConfig.addFilter('isPublic', pages.isPublic);
    eleventyConfig.addFilter('getPublic', pages.getPublic);
    eleventyConfig.addFilter('isCurrent', pages.isCurrent);
    eleventyConfig.addFilter('getCurrent', pages.getCurrent);
    eleventyConfig.addFilter('getPage', pages.getPage);
    eleventyConfig.addFilter('findPage', pages.findPage);
    eleventyConfig.addFilter('hasData', pages.hasData);
    eleventyConfig.addFilter('getData', pages.getData);
    eleventyConfig.addFilter('findData', pages.findData);
    eleventyConfig.addFilter('withData', pages.withData);
    eleventyConfig.addFilter('pageYears', pages.pageYears);
    eleventyConfig.addFilter('eventSort', pages.eventSort);
    eleventyConfig.addFilter('byYear', pages.byYear);
    eleventyConfig.addFilter('removePage', pages.removePage);
    eleventyConfig.addFilter('addCallToAction', pages.addCallToAction);
    eleventyConfig.addFilter('isType', pages.isType);
  
    eleventyConfig.addFilter('fromTaxonomy', taxonomy.fromTaxonomy);
    eleventyConfig.addFilter('ossGroups', taxonomy.ossGroups);
    eleventyConfig.addFilter('pageType', taxonomy.pageType);
  


    return {
        dir: {
            input: "src",
            output: "public"
        }
    };
}

