# PrimoRecentArticlesTab
These files will create a new tab in ExLibris' Primo that will display current articles for individual journals.
This is based on documentation found on the [ExLibris developer blog](https://developers.exlibrisgroup.com/blog/Table_Contents_journals)

Place the recentArticles.js and EXLTabApi.js in your footer file in Primo Back Office.

## Edit per institution
In each file, please update the following variables to match your institution.

### index.php
- $institutionCode - Primo school code
- $institutionView - Primo production view
- $journalTocUsername - Username from the JournalTOC site. [Signup @ JournalTOC](http://www.journaltocs.ac.uk/index.php?action=register)
- $institutionCSS - Custom CSS file in Primo Back Office
- $mashupCSS - mashup.css file in Alma

### recentArticles.js
- iframeSrc - Where your index.php file lives
- tabName - Name that will display to users in Primo
- firstTab - True places the tab first. False places the tab last.
- itemType - How journals are labeled: 'Journal' or 'Serial'.

## Known issues
- Actions menu - In full display of an individual journal, the actions side menu disappears when the recent articles tab is selected.
- Tab not displaying for all journals - Some journals are not included in JournalTOC and will yield zero results. 

