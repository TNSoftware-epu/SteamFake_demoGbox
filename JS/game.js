/*
   File: game.js
   Mô tả: Xử lý logic popup game, dữ liệu game, và hiển thị thông tin
   Ghi chú: Tất cả các comment tiếng Việt giải thích từng phần
*/

// ====================================
// 1. DỮ LIỆU GAME (Database các game)
// ====================================
/*
   Đây là nơi lưu trữ tất cả thông tin về các game
   - Mỗi game là một object có các property: id, name, image, description, v.v.
   - Có thể thêm game bằng cách thêm object mới vào mảng này
*/
const gamesData = [
    {
        id: 1,
        name: "Counter-Strike 2",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/730/header.jpg",
        description: "Counter-Strike 2 là trò chơi bắn súng chiến thuật cạnh tranh nhất. Đây là phần tiếp theo của Counter-Strike: Global Offensive.",
        recentRating: "Rất tích cực (1.212)",
        overallRating: "Rất tích cực (89.234)",
        releaseDate: "01 Thg09, 2023",
        developer: "Valve",
        publisher: "Valve",
        tags: ["Hành động", "Bắn súng", "Đa người chơi"]
    },
    {
        id: 2,
        name: "Dota 2",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/570/header.jpg",
        description: "Dota 2 là trò chơi chiến đấu đội nhóm truyền hình hàng đầu thế giới, hoàn toàn miễn phí để chơi.",
        recentRating: "Rất tích cực (5.432)",
        overallRating: "Rất tích cực (120.567)",
        releaseDate: "09 Thg07, 2013",
        developer: "Valve",
        publisher: "Valve",
        tags: ["MOBA", "Chiến đấu đội nhóm", "Miễn phí"]
    },
    {
        id: 3,
        name: "PUBG: BATTLEGROUNDS",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/578080/header.jpg",
        description: "BATTLEGROUNDS là trò chơi sống sót 100 người chơi theo thể loại deathmatch đầu tiên trên thế giới.",
        recentRating: "Rất tích cực (2.345)",
        overallRating: "Rất tích cực (67.890)",
        releaseDate: "20 Thg12, 2017",
        developer: "PUBG Studios",
        publisher: "Krafton, Inc.",
        tags: ["Sống sót", "Battle Royale", "Hành động"]
    },
    {
        id: 4,
        name: "Black Myth: Wukong",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2358720/header.jpg",
        description: "Black Myth: Wukong là một trò chơi hành động nhập vai lấy cảm hứng từ cuộc phiêu lưu của Sun Wukong từ tác phẩm cổ điển.",
        recentRating: "Rất tích cực (12.543)",
        overallRating: "Rất tích cực (245.678)",
        releaseDate: "20 Thg08, 2024",
        developer: "Game Science",
        publisher: "Game Science",
        tags: ["Hành động", "RPG", "Phiêu lưu"]
    },
    {
        id: 5,
        name: "Grand Theft Auto V",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/271590/header.jpg",
        description: "Khi một thanh niên từ Midwest khiêm tốn bị đưa vào một thành phố đầy tham vọng, anh ta phải làm những gì cần thiết để sống sót.",
        recentRating: "Rất tích cực (8.234)",
        overallRating: "Rất tích cực (356.789)",
        releaseDate: "17 Thg09, 2013",
        developer: "Rockstar Games",
        publisher: "Rockstar Games",
        tags: ["Hành động", "Phiêu lưu", "Cuộc sống mở"]
    },
    {
        id: 6,
        name: "ELDEN RING",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg",
        description: "Trở thành Elden Lord khi bạn xây dựng tâm trí và sử dụng hành động tập thể để chinh phục những kẻ thù khó nhất.",
        recentRating: "Rất tích cực (15.678)",
        overallRating: "Rất tích cực (234.567)",
        releaseDate: "25 Thg02, 2022",
        developer: "FromSoftware",
        publisher: "Bandai Namco",
        tags: ["RPG", "Hành động", "Kỳ ảo"]
    },
    {
        id: 7,
        name: "Baldur's Gate 3",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1086940/header.jpg",
        description: "Baldur's Gate 3 là trò chơi nhập vai turn-based dựa trên D&D 5e, nổi tiếng với những lựa chọn độc đáo và hệ quả sâu sắc.",
        recentRating: "Rất tích cực (18.234)",
        overallRating: "Rất tích cực (289.345)",
        releaseDate: "03 Thg08, 2023",
        developer: "Larian Studios",
        publisher: "Larian Studios",
        tags: ["RPG", "Chiến thuật", "Phiêu lưu"]
    },
    {
        id: 8,
        name: "Cyberpunk 2077",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
        description: "Cyberpunk 2077 là một trò chơi nhập vai action theo quan điểm thứ nhất được lấy cảm hứng từ tạp chí Cyberpunk 2020.",
        recentRating: "Rất tích cực (6.789)",
        overallRating: "Rất tích cực (145.678)",
        releaseDate: "10 Thg12, 2020",
        developer: "CD Projekt Red",
        publisher: "CD Projekt Red",
        tags: ["RPG", "Hành động", "Sci-Fi"]
    },
    {
        id: 9,
        name: "Stardew Valley",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/413150/header.jpg",
        description: "Bạn đã kế thừa một nông trại cũ ở thung lũng Stardew. Được trang bị các dụng cụ bị hư hỏng và chút tiền bạc.",
        recentRating: "Rất tích cực (11.234)",
        overallRating: "Rất tích cực (178.234)",
        releaseDate: "26 Thg02, 2016",
        developer: "ConcernedApe",
        publisher: "ConcernedApe",
        tags: ["Mô phỏng", "Nông trại", "Thư giãn"]
    },
    {
        id: 10,
        name: "Left 4 Dead 2",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/550/header.jpg",
        description: "Left 4 Dead 2 là một trò chơi bắn súng zombie hợp tác 4 người chơi từ Valve.",
        recentRating: "Rất tích cực (2.456)",
        overallRating: "Rất tích cực (98.765)",
        releaseDate: "17 Thg11, 2009",
        developer: "Valve",
        publisher: "Valve",
        tags: ["Hành động", "Zombie", "Hợp tác"]
    },
    {
        id: 11,
        name: "The Witcher 3: Wild Hunt",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg",
        description: "Đánh bại các quái vật, hoàn thành các nhiệm vụ, và khám phá bản đồ lớn trong trò chơi nhập vai này.",
        recentRating: "Rất tích cực (7.234)",
        overallRating: "Rất tích cực (212.345)",
        releaseDate: "19 Thg05, 2015",
        developer: "CD Projekt Red",
        publisher: "CD Projekt Red",
        tags: ["RPG", "Hành động", "Phiêu lưu"]
    },
    {
        id: 12,
        name: "Dark Souls III",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/374320/header.jpg",
        description: "Dark Souls III mang đến một trải nghiệm chiến đấu khó khăn và bí ẩn đầy cảm xúc.",
        recentRating: "Rất tích cực (4.567)",
        overallRating: "Rất tích cực (123.456)",
        releaseDate: "24 Thg03, 2016",
        developer: "FromSoftware",
        publisher: "Bandai Namco",
        tags: ["RPG", "Hành động", "Khó"]
    },
    {
        id: 13,
        name: "Minecraft",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/39320/header.jpg",
        description: "Minecraft là một trò chơi tạo thế giới nơi bạn có thể khám phá, xây dựng, và sống sót.",
        recentRating: "Rất tích cực (20.123)",
        overallRating: "Rất tích cực (534.567)",
        releaseDate: "18 Thg11, 2011",
        developer: "Mojang Studios",
        publisher: "Mojang Studios",
        tags: ["Sandbox", "Xây dựng", "Sống sót"]
    },
    {
        id: 14,
        name: "Terraria",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/105600/header.jpg",
        description: "Terraria là một trò chơi action-adventure 2D với phần tử xây dựng, khám phá, chiến đấu.",
        recentRating: "Rất tích cực (5.234)",
        overallRating: "Rất tích cực (189.456)",
        releaseDate: "16 Thg05, 2011",
        developer: "Re-Logic",
        publisher: "Re-Logic",
        tags: ["Hành động", "Phiêu lưu", "Sandbox"]
    },
    {
        id: 15,
        name: "Portal 2",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/620/header.jpg",
        description: "Portal 2 là một trò chơi câu đố-hành động thứ nhất nơi bạn sử dụng cánh cửa để giải quyết vấn đề.",
        recentRating: "Rất tích cực (3.567)",
        overallRating: "Rất tích cực (156.789)",
        releaseDate: "19 Thg04, 2011",
        developer: "Valve",
        publisher: "Valve",
        tags: ["Câu đố", "Hành động", "Thú vị"]
    },
    {
        id: 16,
        name: "Team Fortress 2",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/440/header.jpg",
        description: "Team Fortress 2 là một trò chơi bắn súng đội nhóm miễn phí với các nhân vật độc đáo.",
        recentRating: "Rất tích cực (1.234)",
        overallRating: "Rất tích cực (67.234)",
        releaseDate: "10 Thg10, 2007",
        developer: "Valve",
        publisher: "Valve",
        tags: ["Bắn súng", "Đội nhóm", "Miễn phí"]
    },
    {
        id: 17,
        name: "Rust",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/252490/header.jpg",
        description: "Rust là một trò chơi sinh tồn đa người chơi nơi bạn phải cạnh tranh với những người chơi khác.",
        recentRating: "Rất tích cực (8.567)",
        overallRating: "Rất tích cực (234.567)",
        releaseDate: "11 Thg02, 2018",
        developer: "Facepunch Studios",
        publisher: "Facepunch Studios",
        tags: ["Sinh tồn", "Đa người chơi", "Phiêu lưu"]
    },
    {
        id: 18,
        name: "Valheim",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/892970/header.jpg",
        description: "Valheim là một trò chơi sinh tồn đầu tiên lấy cảm hứng từ các vị thần Bắc Âu.",
        recentRating: "Rất tích cực (9.234)",
        overallRating: "Rất tích cực (198.234)",
        releaseDate: "02 Thg02, 2021",
        developer: "Iron Gate AB",
        publisher: "Coffee Stain Publishing",
        tags: ["Sinh tồn", "Phiêu lưu", "Xây dựng"]
    },
    {
        id: 19,
        name: "Hogwarts Legacy",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/990080/header.jpg",
        description: "Hogwarts Legacy mang bạn vào Đại học Phù Thủy Hogwarts nơi bạn sẽ viết câu chuyện của mình.",
        recentRating: "Rất tích cực (11.345)",
        overallRating: "Rất tích cực (267.456)",
        releaseDate: "10 Thg02, 2023",
        developer: "Avalanche Software",
        publisher: "Warner Bros. Games",
        tags: ["RPG", "Phiêu lưu", "Kỳ ảo"]
    },
    {
        id: 20,
        name: "Monster Hunter: World",
        image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/582010/header.jpg",
        description: "Monster Hunter: World là một trò chơi hành động nơi bạn săn các con quái vật khủng khiếp.",
        recentRating: "Rất tích cực (6.234)",
        overallRating: "Rất tích cực (178.912)",
        releaseDate: "09 Thg08, 2018",
        developer: "Capcom",
        publisher: "Capcom",
        tags: ["Hành động", "Săn bắn", "Phiêu lưu"]
    }
];

// ====================================
// 2. HÀM KHỞI TẠO - Chạy khi trang load
// ====================================
/*
   - Đây là hàm được gọi tự động khi trang HTML được tải
   - Dùng để thiết lập các event listener (lắng nghe sự kiện)
*/
function initGameModal() {
    // Gọi hàm setupGameCards() để thiết lập các game card
    setupGameCards();
    
    // Gọi hàm setupModalEvents() để thiết lập các sự kiện modal
    setupModalEvents();
}

// ====================================
// 3. THIẾT LẬP GAME CARDS
// ====================================
/*
   Hàm này tìm tất cả các game card trong store.html
   và thêm sự kiện click để mở popup khi bấm vào card
*/
function setupGameCards() {
    // document.querySelectorAll() tìm tất cả phần tử có class 'game-card'
    const gameCards = document.querySelectorAll('.game-card');
    
    // .forEach() duyệt qua từng game card
    gameCards.forEach((card, index) => {
        // Thêm attribute data-game-id để liên kết card với dữ liệu game
        // Dùng index + 1 vì mảng gamesData bắt đầu từ id = 1
        card.setAttribute('data-game-id', index + 1);
        
        // Thêm style cursor: pointer để hiển thị con trỏ tay khi hover
        card.style.cursor = 'pointer';
        
        // Thêm sự kiện click
        card.addEventListener('click', function() {
            // Lấy game-id từ attribute
            const gameId = this.getAttribute('data-game-id');
            // Gọi hàm openGameModal với game-id
            openGameModal(gameId);
        });
    });
}

// ====================================
// 4. THIẾT LẬP MODAL EVENTS
// ====================================
/*
   Hàm này thiết lập các sự kiện cho modal:
   - Bấm nút X để đóng
   - Bấm overlay (nền mờ) để đóng
*/
function setupModalEvents() {
    // Lấy các phần tử từ HTML
    const modal = document.getElementById('gameModal');
    const closeBtn = document.querySelector('.game-modal-close');
    const overlay = document.querySelector('.game-modal-overlay');
    
    // Sự kiện click nút X
    closeBtn.addEventListener('click', function() {
        closeGameModal();
    });
    
    // Sự kiện click overlay (nền mờ)
    overlay.addEventListener('click', function() {
        closeGameModal();
    });
    
    // Sự kiện nhấn phím ESC để đóng modal
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeGameModal();
        }
    });
}

// ====================================
// 5. MỞ MODAL - Hiển thị thông tin game
// ====================================
/*
   Hàm này được gọi khi người dùng bấm vào một game card
   - gameId là ID của game từ gamesData
*/
function openGameModal(gameId) {
    // Tìm game trong mảng gamesData bằng id
    // find() trả về phần tử đầu tiên khớp điều kiện
    const game = gamesData.find(g => g.id == gameId);
    
    // Nếu không tìm thấy game, thoát hàm
    if (!game) {
        console.error('Game không tìm thấy với ID:', gameId);
        return;
    }
    
    // Gộp dữ liệu game vào các phần tử HTML
    populateGameModal(game);
    
    // Hiển thị modal
    const modal = document.getElementById('gameModal');
    modal.classList.add('active'); // Thêm class 'active' để hiển thị
    
    // Ngăn cuộn trang khi modal mở (tuỳ chọn)
    document.body.style.overflow = 'hidden';
}

// ====================================
// 6. ĐÓN MODAL - Ẩn thông tin game
// ====================================
/*
   Hàm này được gọi khi người dùng bấm nút X, overlay, hoặc ESC
*/
function closeGameModal() {
    // Lấy modal
    const modal = document.getElementById('gameModal');
    
    // Loại bỏ class 'active' để ẩn
    modal.classList.remove('active');
    
    // Cho phép cuộn trang trở lại
    document.body.style.overflow = 'auto';
}

// ====================================
// 7. ĐIỀN DỮ LIỆU VÀO MODAL
// ====================================
/*
   Hàm này nhận dữ liệu game và gán vào các phần tử HTML trong modal
   - game là một object chứa tất cả thông tin game
*/
function populateGameModal(game) {
    // Gán dữ liệu vào các phần tử bằng cách thay đổi .textContent hoặc .src
    
    // Tên game
    document.getElementById('gameName').textContent = game.name;
    
    // Mô tả game
    document.getElementById('gameDescription').textContent = game.description;
    
    // Hình ảnh game
    document.getElementById('gameImage').src = game.image;
    document.getElementById('gameImage').alt = game.name;
    
    // Đánh giá gần đây
    document.getElementById('gameRecentRating').textContent = game.recentRating;
    
    // Đánh giá chung
    document.getElementById('gameOverallRating').textContent = game.overallRating;
    
    // Ngày phát hành
    document.getElementById('gameReleaseDate').textContent = game.releaseDate;
    
    // Nhà phát triển
    document.getElementById('gameDeveloper').textContent = game.developer;
    
    // Nhà phát hành
    document.getElementById('gamePublisher').textContent = game.publisher;
    
    // Tạo các tags (nhãn)
    populateTags(game.tags);
}

// ====================================
// 8. TẠOCÁC TAGS (NHÃN)
// ====================================
/*
   Hàm này tạo các tag từ mảng tags trong dữ liệu game
*/
function populateTags(tags) {
    // Lấy container tags
    const tagsContainer = document.getElementById('gameTags');
    
    // Xóa các tag cũ (nếu có) bằng cách đặt innerHTML = ''
    tagsContainer.innerHTML = '';
    
    // Duyệt qua từng tag
    tags.forEach(tag => {
        // Tạo phần tử <span> mới
        const tagElement = document.createElement('span');
        
        // Gán class 'game-tag' để có style CSS
        tagElement.classList.add('game-tag');
        
        // Gán text content là tên tag
        tagElement.textContent = tag;
        
        // Thêm tag vào container
        tagsContainer.appendChild(tagElement);
    });
}

// ====================================
// 9. GỌI KHỞI TẠO KHI TRANG LOAD
// ====================================
/*
   Cách 1: Thêm sự kiện DOMContentLoaded
   - DOMContentLoaded được kích hoạt khi HTML được tải xong (trước khi tất cả ảnh tải xong)
   - Điều này đảm bảo tất cả phần tử HTML có sẵn trước khi chúng ta lấy chúng
*/
document.addEventListener('DOMContentLoaded', function() {
    initGameModal();
});

/* 
   HOẶC Cách 2: Gọi hàm trong thẻ <body onload="initGameModal()">
   (Nhưng cách 1 là tốt hơn vì không làm ô nhiễm HTML)
*/
