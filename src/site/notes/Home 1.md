---
{"dg-publish":true,"permalink":"/home-1/","title":"the sworn library"}
---

# the sworn library
Welcome to the sworn library!

> New to sworn library?
Click the [[blue text\|blue text]] to enter a link or a [[mpt/YHMAH\|book]].

[[b storage/Library\|Visit your Reading List]]
***
# New Arrivals

|            Featured             |
| :-----------------------------: |
|      ![sitnbanner.webp](/img/user/sitn/sitnbanner.webp)       |
| [[sitn/sitn\|Strangers by Midnight]] |

<div id="dynamic-table-zone">

| Discover                        |                                  | Placeholder                      |
| ------------------------------- | -------------------------------- | -------------------------------- |
| ![coverimg\|165](/img/user/yeo/yeostorage/yeocover.webp) | ![coverimg\|165](/img/user/sitn/sitncover.webp) | ![coverimg\|165](/img/user/sitn/sitncover.webp) |
| [[yeo/yeo\|Your Eyes Only]]         | [[sitn/sitn\|Strangers by Midnight]]  | [[sitn/sitn\|Strangers by Midnight]]  |

</div>

***


|           Coming Soon           |
| :-----------------------------: |
|       ![tmpbanner.webp](/img/user/b%20storage/a%20storage/tmpbanner.webp)       |
| [[mpt/YHMAH\|The Mafia's Princess]] |

---
Copyright © 2025 the sworn library
All Rights Reserved.

***

Bookmark this website and visit it every once in a while. Accompany us while we grow our collection!

<script>
document.addEventListener("DOMContentLoaded", () => {
  const zone = document.getElementById("dynamic-table-zone");
  if (!zone) return;

  const table = zone.querySelector("table");
  if (!table) return;

  const rows = Array.from(table.rows);
  const numCols = rows[0]?.cells.length || 0;
  if (numCols <= 1) return;

  // Shuffle columns except the first
  const fixedIndex = 0;
  const movableIndexes = [...Array(numCols).keys()].slice(1);
  for (let i = movableIndexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [movableIndexes[i], movableIndexes[j]] = [movableIndexes[j], movableIndexes[i]];
  }

  // Rebuild rows
  rows.forEach(row => {
    const cells = Array.from(row.cells);
    const fixedCell = cells[fixedIndex];
    const shuffledCells = movableIndexes.map(i => cells[i]);
    while (row.firstChild) row.removeChild(row.firstChild);
    row.appendChild(fixedCell);
    shuffledCells.forEach(cell => row.appendChild(cell));
  });
});
</script>