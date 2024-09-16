document.addEventListener('DOMContentLoaded', () => {
    chrome.bookmarks.getTree((bookmarkTreeNodes) => {
        const rootNode = bookmarkTreeNodes[0].children;

        // Separate bookmarks not in folders and display them
        const rootBookmarks = bookmarkTreeNodes[0].children.filter(node => !node.children);
        if (rootBookmarks.length > 0) {
            displayRootBookmarks(rootBookmarks);
        }

        // Display all folders and their bookmarks
        displayFolders(rootNode);
    });

    // Display folders recursively
    function displayFolders(bookmarks) {
        const foldersContainer = document.getElementById('folders');

        bookmarks.forEach((bookmark) => {
            if (bookmark.children) {
                // Create a button for each folder
                const folderButton = document.createElement('button');
                folderButton.textContent = bookmark.title;
                folderButton.className = 'folder-button';

                // Add click event to show bookmarks for that folder
                folderButton.addEventListener('click', () => {
                    displayBookmarks(bookmark.children);
                });

                foldersContainer.appendChild(folderButton);

                // Recursively display nested folders
                displayFolders(bookmark.children);
            }
        });
    }

    // Display bookmarks inside a folder
    function displayBookmarks(bookmarks) {
        const bookmarksContainer = document.getElementById('bookmarks');
        bookmarksContainer.innerHTML = '';  // Clear existing bookmarks

        // const grouptitle = document.createElement('h2');
        // grouptitle.textContent = bookmarks.title;
        // grouptitle.className = 'grouptitle';
        // bookmarksContainer.appendChild(grouptitle)

        bookmarks.forEach((bookmark) => {
            if (!bookmark.children) {
                const card = document.createElement('a');
                card.className = 'card';
                card.href = bookmark.url;
                card.target = "_blank";

                const title = document.createElement('h3');
                title.textContent = bookmark.title;

                const link = document.createElement('a');
                link.href = bookmark.url;
                link.textContent = 'View';
                link.target = "_blank";

                card.appendChild(title);
                card.appendChild(link);
                bookmarksContainer.appendChild(card);
            }
        });
    }

    // Display bookmarks that are not in any folder (root level)
    function displayRootBookmarks(bookmarks) {
        const foldersContainer = document.getElementById('folders');
        const rootFolderButton = document.createElement('button');

        rootFolderButton.textContent = 'Uncategorized Bookmarks';  // For bookmarks not in any folder
        rootFolderButton.className = 'folder-button';

        rootFolderButton.addEventListener('click', () => {
            displayBookmarks(bookmarks);  // Display root bookmarks
        });

        foldersContainer.appendChild(rootFolderButton);
    }
});
