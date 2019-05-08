/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', () => {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This test loops through each feed and determines if the URL
         * defined and not empty.
         */
        it('should defines all URLs', () => {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        })

        /* This test looped through each feed and determines that each
         * feed has a name and not empty.
         */
        it('should defines feed names', () => {
            for (let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        })
    });


    // Menu test suite.
    describe('the menu', () => {

        // This test ensures the menu element is hidden by default.
        it('should hide menu elements', () => {
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        });

        // this test ensures that the menue change visibility when the menu icon is clicked
        it('should toggles on and off', () => {
            const menu = document.querySelector('.menu-icon-link');

            // This tests for menue displaying
            menu.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(false);

            // This tests for menu hiding
            menu.click();
            expect(document.body.classList.contains('menu-hidden')).toBe(true);
        })
    })    

        
    // Initial entries test suite.
    describe('Initial Entries', () => {
        beforeEach((done) => {
            loadFeed(0, done)
        });

        // tests that there is at least one entry in the feed container.
        it('should has atleast a single elemnt in feed container', () => {
            const feedChildren = document.querySelectorAll('.feed .entry-link .entry ');
            
            expect(feedChildren.length > 0).toBe(true);
        })
    });
    

    // New Feed Selection test suite
    describe('New Feed Selection', () => {

        /* This is a test that ensures when a new feed is loaded by
         * the loadFeed function that the content actually changes.
         */
        beforeEach((done) => {
            loadFeed(0, () => {
                firstFeed = document.querySelector('.feed').innerHTML;
                loadFeed(1, () => {
                    secondFeed = document.querySelector('.feed').innerHTML;
                    done();
                });
            });
        });
 
        //Ensures that two entries are not to be equal
        it('should change content when loaded', () => {
            expect(firstFeed).not.toBe(secondFeed);
        })
    });
}());
