/* All tests go into the $() to ensure the run after the DOM is ready */
$(function() {
    /* Tests the RSS feeds */
    describe('RSS Feeds', () => {
        /* Checks allFeeds is working and has feeds */
        it('are defined', () => {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Checks each feed has a url */
        it('has a defined URL that is not empty', () => {
            allFeeds.forEach(feed => {
                expect(feed.url).toBeTruthy();
            });
        });


        /* Checks each feed has a name */
         it('has a defined name that is not empty', () => {
             allFeeds.forEach(feed => {
                 expect(feed.name).toBeDefined();
                 expect(feed.name.length).not.toBe(0);
             });
         });
    });

    /* Tests the Menu */
    describe('The menu', () => {
        const menu = document.querySelector('body');
        const icon = document.querySelector('.menu-icon-link');

        /* Checks the menu is hidden by default */
        it('hides the menu element by default', () =>
            expect(menu.classList.contains('menu-hidden')).toBe(true));

         /* Checks menu displays and hides when clicked */
         it('displays and hides the menu when clicked', () => {
             icon.click();
             expect(menu.classList.contains('menu-hidden')).toBe(false);
             icon.click();
             expect(menu.classList.contains('menu-hidden')).toBe(true);
         });

    });

    /* Tests entries in Feed */
    describe('Initial Entries', () => {
        /* Checks the feed isn't empty */
        const feed = document.querySelector('.feed');
        const allEntries = [];

        beforeEach((done) => loadFeed(0, done));

        it('at least single entry element within the .feed', () => {
            //expect(feed.children.length > 0).toBe(true));
            //expect(feed.children.classList.include('.entry')).toBe(true));

            // Get all children of the .feed element
            for (let x = 0; x < feed.childElementCount; x++) {
                allEntries.push(feed.children[x]);
            }

            // Check if each child has .entry class
            let a = allEntries.length;
            for (let i = 0; i < a; i++) {

                switch (allEntries[i].classList.contains('entry-link')) {
                    case true:
                            break;
                    case false:
                        allEntries.splice(i, 1);
                }
            }

            expect(allEntries.length > 0).toBe(true);
    })});

    /* Tests new entries in Feed */
    describe('New Feed Selection', () => {
        /* Checks Feed enteries do change */

        let feed = document.querySelector('.feed');
        let feedFirstItems = [], feedSecondItems = [];

        beforeEach((done) => {
            loadFeed(0, () => {
                Array.from(feed.children).forEach(item => feedFirstItems.push(item.innerText));
                loadFeed(1, () => {
                    Array.from(feed.children).forEach(item => feedSecondItems.push(item.innerText));
                    done();
                });
            });
        });

        it('content changes when new feed is loaded', () => {
            Array.from(feed.children).forEach((item, index) => {
                expect(feedFirstItems).not.toEqual(feedSecondItems);
            });
            
        });
    });

        
}());
