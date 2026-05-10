const propertyBlocks = [
    {
        id: 2,
        name: "Forum Dr. Apt. Complex B",
        occupiedProperties: "20/20",
        income: 55500,
        cost: 30000,
        image: "https://i.postimg.cc/HnRRpwSM/Forum_Dr_Apt_Complex_B.png",
        storage: 60000,
        properties: [
            {
                status: "Evictable",
                address: "Forum Drive 2 / Apt1",
                interior: "Janitor Apartment",
                renterName: "Abhimannu Das",
                phone: "696-9911",
                income: 1500,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Evictable",
                address: "Forum Drive 2 / Apt2",
                interior: "Janitor Apartment",
                renterName: "Munshi Jr",
                phone: "559-3942",
                income: 2000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Overdue",
                address: "Forum Drive 2 / Apt3",
                interior: "Janitor Apartment",
                renterName: "Logan Ward",
                phone: "344-1317",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Overdue",
                address: "Forum Drive 2 / Apt4",
                interior: "Janitor Apartment",
                renterName: "Akkhar Adhikari",
                phone: "488-1724",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Overdue",
                address: "Forum Drive 2 / Apt5",
                interior: "Janitor Apartment",
                renterName: "Cutter Saif",
                phone: "946-7478",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Paid 5/5/2026",
                address: "Forum Drive 2 / Apt6",
                interior: "Janitor Apartment",
                renterName: "Freak Carlos",
                phone: "262-3261",
                income: 1500,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Overdue",
                address: "Forum Drive 2 / Apt7",
                interior: "Janitor Apartment",
                renterName: "Fallen Sky",
                phone: "171-7764",
                income: 2500,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Overdue",
                address: "Forum Drive 2 / Apt8",
                interior: "Janitor Apartment",
                renterName: "Mike Reggal",
                phone: "435-5025",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Overdue",
                address: "Forum Drive 2 / Apt9",
                interior: "Janitor Apartment",
                renterName: "Tillu Galoch",
                phone: "234-0177",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Overdue",
                address: "Forum Drive 2 / Apt10",
                interior: "Janitor Apartment",
                renterName: "Alphonse Capone",
                phone: "367-8007",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Paid 5/17/2026",
                address: "Forum Drive 2 / Apt12",
                interior: "Janitor Apartment",
                renterName: "Ahmed Ferdous",
                phone: "619-6407",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Evictable",
                address: "Forum Drive 2 / Apt13",
                interior: "Janitor Apartment",
                renterName: "Sallu The King",
                phone: "701-3588",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Evictable",
                address: "Forum Drive 2 / Apt14",
                interior: "Janitor Apartment",
                renterName: "Akkhar Adhikari",
                phone: "488-1724",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Overdue",
                address: "Forum Drive 2 / Apt15",
                interior: "Janitor Apartment",
                renterName: "Xenom Cortez",
                phone: "120-7012",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Overdue",
                address: "Forum Drive 2 / Apt16",
                interior: "Janitor Apartment",
                renterName: "John Marston",
                phone: "491-0176",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Paid 5/6/2026",
                address: "Forum Drive 2 / Apt17",
                interior: "Janitor Apartment",
                renterName: "Rotax Kit",
                phone: "839-9450",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Overdue",
                address: "Forum Drive 2 / Apt18",
                interior: "Janitor Apartment",
                renterName: "Cutter Saif",
                phone: "946-7478",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Evictable",
                address: "Forum Drive 2 / Apt19",
                interior: "Janitor Apartment",
                renterName: "Alora Morwen",
                phone: "138-6420",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Paid 5/30/2026",
                address: "Forum Drive 2 / Apt20",
                interior: "Janitor Apartment",
                renterName: "Khokan Kar",
                phone: "554-6632",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Paid 5/13/2026",
                address: "Forum Drive 2 / Apt21",
                interior: "Janitor Apartment",
                renterName: "Felix Delgado",
                phone: "105-7309",
                income: 3000,
                cost: 1500,
                storage: 3000
            }
        ]
    },
    {
        id: 163,
        name: "Niland Avenue",
        occupiedProperties: "8/8",
        income: 14251,
        cost: 8000,
        image: "https://i.postimg.cc/kGzznQjQ/Niland_Avenue.png",
        storage: 18000,
        properties: [
            {
                status: "Paid 5/7/2026",
                address: "Niland Avenue 1",
                interior: "Trevor's Trailer",
                renterName: "Jimmy Kataria",
                phone: "205-4944",
                income: 1,
                cost: 1000,
                storage: 2250
            },
            {
                status: "Paid 6/29/2026",
                address: "Niland Avenue 2",
                interior: "Trevor's Trailer",
                renterName: "Sumsul Arefin",
                phone: "165-2196",
                income: 2000,
                cost: 1000,
                storage: 2250
            },
            {
                status: "Paid 5/7/2026",
                address: "Niland Avenue 3",
                interior: "Trevor's Trailer",
                renterName: "Hamza Khan",
                phone: "975-6969",
                income: 2000,
                cost: 1000,
                storage: 2250
            },
            {
                status: "Evictable",
                address: "Niland Avenue 4",
                interior: "Trevor's Trailer",
                renterName: "Roy Vahi",
                phone: "989-8827",
                income: 2000,
                cost: 1000,
                storage: 2250
            },
            {
                status: "Paid 7/16/2026",
                address: "Niland Avenue 5",
                interior: "Trevor's Trailer",
                renterName: "Nishar Reza",
                phone: "789-4945",
                income: 2250,
                cost: 1000,
                storage: 2250
            },
            {
                status: "Paid 5/6/2026",
                address: "Niland Avenue 6",
                interior: "Trevor's Trailer",
                renterName: "Xenom Cortez",
                phone: "120-7012",
                income: 2000,
                cost: 1000,
                storage: 2250
            },
            {
                status: "Paid 6/29/2026",
                address: "Niland Avenue 7",
                interior: "Trevor's Trailer",
                renterName: "Anaya Wales",
                phone: "708-3265",
                income: 2000,
                cost: 1000,
                storage: 2250
            },
            {
                status: "Paid 6/29/2026",
                address: "Niland Avenue 8",
                interior: "Trevor's Trailer",
                renterName: "Azzy Adi",
                phone: "633-4727",
                income: 2000,
                cost: 1000,
                storage: 2250
            }
        ]
    },
    {
        id: 66,
        name: "Steele Way",
        occupiedProperties: "4/6",
        income: 32300,
        cost: 48000,
        image: "https://i.postimg.cc/C5XXFGvC/Steele_Way.png",
        storage: 90000,
        properties: [
            {
                status: "Paid 5/9/2026",
                address: "Steele Way 1",
                interior: "Michael's Mansion",
                renterName: "Nr Badhan",
                phone: "446-5797",
                income: 15500,
                cost: 8000,
                storage: 15000
            },
            {
                status: "Paid 5/7/2026",
                address: "Steele Way 2",
                interior: "Michael's Mansion",
                renterName: "Freak Carlos",
                phone: "262-3261",
                income: 800,
                cost: 8000,
                storage: 15000
            },
            {
                status: "Overdue",
                address: "Steele Way 3",
                interior: "Michael's Mansion",
                renterName: "Munshi Jr",
                phone: "559-3942",
                income: 8000,
                cost: 8000,
                storage: 15000
            },
            {
                status: "Overdue",
                address: "Steele Way 4",
                interior: "Michael's Mansion",
                renterName: "Cutter Saif",
                phone: "946-7478",
                income: 8000,
                cost: 8000,
                storage: 15000
            },
            {
                status: "Empty",
                address: "Steele Way 5",
                interior: "Michael's Mansion",
                renterName: "N/A",
                phone: "N/A",
                income: 0,
                cost: 8000,
                storage: 15000
            },
            {
                status: "Empty",
                address: "Steele Way 6",
                interior: "Michael's Mansion",
                renterName: "N/A",
                phone: "N/A",
                income: 0,
                cost: 8000,
                storage: 15000
            }
        ]
    },
    {
        id: 37,
        name: "Nikola Avenue",
        occupiedProperties: "6/6",
        income: 48500,
        cost: 31500,
        image: "https://i.postimg.cc/BbkkqTh2/Nikola_Avenue.png",
        storage: 55500,
        properties: [
            {
                status: "Paid 5/4/2026",
                address: "Nikola Avenue 1",
                interior: "Michael's Mansion",
                renterName: "Judgement Carter",
                phone: "666-6767",
                income: 11000,
                cost: 8000,
                storage: 15000
            },
            {
                status: "Evictable",
                address: "Nikola Avenue 2",
                interior: "Trevor's Beach House",
                renterName: "Zeus Demarco",
                phone: "275-0784",
                income: 8000,
                cost: 5000,
                storage: 9000
            },
            {
                status: "Evictable",
                address: "Nikola Avenue 3",
                interior: "Trevor's Beach House",
                renterName: "Nexus Andree",
                phone: "863-6423",
                income: 9000,
                cost: 5000,
                storage: 9000
            },
            {
                status: "Overdue",
                address: "Nikola Avenue 4",
                interior: "Mid-End Apartment (House)",
                renterName: "Stefan Liebert",
                phone: "943-9440",
                income: 7500,
                cost: 4500,
                storage: 7500
            },
            {
                status: "Paid 5/11/2026",
                address: "Nikola Avenue 5",
                interior: "Mid-End Apartment (House)",
                renterName: "Nr Badhan",
                phone: "446-5797",
                income: 7000,
                cost: 4500,
                storage: 7500
            },
            {
                status: "Paid 5/8/2026",
                address: "Nikola Avenue 6",
                interior: "Mid-End Apartment (House)",
                renterName: "Roy Vahi",
                phone: "989-8827",
                income: 6000,
                cost: 4500,
                storage: 7500
            }
        ]
    },
    {
        id: 77,
        name: "Eclipse Boulevard",
        occupiedProperties: "10/10",
        income: 40000,
        cost: 14000,
        image: "https://i.postimg.cc/VvppYq7M/Eclipse_Boulevard.png",
        storage: 30000,
        properties: [
            {
                status: "Paid 5/23/2026",
                address: "Eclipse Boulevard 1",
                interior: "Motel",
                renterName: "Sumsul Arefin",
                phone: "165-2196",
                income: 2500,
                cost: 500,
                storage: 1500
            },
            {
                status: "Paid 5/9/2026",
                address: "Eclipse Boulevard 2",
                interior: "Motel",
                renterName: "Sumsul Arefin",
                phone: "165-2196",
                income: 2500,
                cost: 500,
                storage: 1500
            },
            {
                status: "Paid 5/9/2026",
                address: "Eclipse Boulevard 3 / Apt1",
                interior: "Motel",
                renterName: "Sumsul Arefin",
                phone: "165-2196",
                income: 2500,
                cost: 500,
                storage: 1500
            },
            {
                status: "Paid 5/9/2026",
                address: "Eclipse Boulevard 3 / Apt2",
                interior: "Motel",
                renterName: "Sumsul Arefin",
                phone: "165-2196",
                income: 2500,
                cost: 500,
                storage: 1500
            },
            {
                status: "Paid 5/16/2026",
                address: "Eclipse Boulevard 3 / Apt3",
                interior: "Motel",
                renterName: "Sumsul Arefin",
                phone: "165-2196",
                income: 2500,
                cost: 500,
                storage: 1500
            },
            {
                status: "Paid 5/23/2026",
                address: "Eclipse Boulevard 3 / Apt4",
                interior: "Motel",
                renterName: "Sumsul Arefin",
                phone: "165-2196",
                income: 2500,
                cost: 500,
                storage: 1500
            },
            {
                status: "Paid 5/9/2026",
                address: "Eclipse Boulevard 4",
                interior: "Trevor's Beach House",
                renterName: "Sumsul Arefin",
                phone: "165-2196",
                income: 10000,
                cost: 5000,
                storage: 9000
            },
            {
                status: "Paid 5/9/2026",
                address: "Eclipse Boulevard 5",
                interior: "Trevor's Beach House",
                renterName: "Sumsul Arefin",
                phone: "165-2196",
                income: 10000,
                cost: 5000,
                storage: 9000
            },
            {
                status: "Paid 5/9/2026",
                address: "Eclipse Boulevard 6",
                interior: "Motel",
                renterName: "Sumsul Arefin",
                phone: "165-2196",
                income: 2500,
                cost: 500,
                storage: 1500
            },
            {
                status: "Paid 5/16/2026",
                address: "Eclipse Boulevard 7",
                interior: "Motel",
                renterName: "Sumsul Arefin",
                phone: "165-2196",
                income: 2500,
                cost: 500,
                storage: 1500
            }
        ]
    },
    {
        id: 3,
        name: "Forum Dr. Apt. Complex C",
        occupiedProperties: "12/19",
        income: 33500,
        cost: 28500,
        image: "https://i.postimg.cc/tJwwX3rx/Forum_Dr_Apt_Complex_C.png",
        storage: 57000,
        properties: [
            {
                status: "Paid 5/10/2026",
                address: "Forum Drive 3 / Apt1",
                interior: "Janitor Apartment",
                renterName: "Pablo Escobar",
                phone: "987-9002",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Evictable",
                address: "Forum Drive 3 / Apt1",
                interior: "Janitor Apartment",
                renterName: "Anthony Spero",
                phone: "730-2745",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Evictable",
                address: "Forum Drive 3 / Apt2",
                interior: "Janitor Apartment",
                renterName: "Abhimannu Das",
                phone: "696-9911",
                income: 1500,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Paid 5/6/2026",
                address: "Forum Drive 3 / Apt3",
                interior: "Janitor Apartment",
                renterName: "Arthur Shelby",
                phone: "149-8984",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Paid 5/16/2026",
                address: "Forum Drive 3 / Apt4",
                interior: "Janitor Apartment",
                renterName: "Topu Khan",
                phone: "328-7168",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Evictable",
                address: "Forum Drive 3 / Apt5",
                interior: "Janitor Apartment",
                renterName: "Sallu The King",
                phone: "701-3588",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Paid 5/13/2026",
                address: "Forum Drive 3 / Apt6",
                interior: "Janitor Apartment",
                renterName: "Felix Delgado",
                phone: "105-7309",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Empty",
                address: "Forum Drive 3 / Apt7",
                interior: "Janitor Apartment",
                renterName: "N/A",
                phone: "N/A",
                income: 0,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Overdue",
                address: "Forum Drive 3 / Apt8",
                interior: "Janitor Apartment",
                renterName: "Raghavendra Yadav",
                phone: "112-4892",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Evictable",
                address: "Forum Drive 3 / Apt10",
                interior: "Janitor Apartment",
                renterName: "Anthony Spero",
                phone: "730-2745",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Empty",
                address: "Forum Drive 3 / Apt10",
                interior: "Janitor Apartment",
                renterName: "N/A",
                phone: "N/A",
                income: 0,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Empty",
                address: "Forum Drive 3 / Apt11",
                interior: "Janitor Apartment",
                renterName: "N/A",
                phone: "N/A",
                income: 0,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Empty",
                address: "Forum Drive 3 / Apt12",
                interior: "Janitor Apartment",
                renterName: "N/A",
                phone: "N/A",
                income: 0,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Evictable",
                address: "Forum Drive 3 / Apt13",
                interior: "Janitor Apartment",
                renterName: "Adi Marcus",
                phone: "802-6654",
                income: 3000,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Paid 5/8/2026",
                address: "Forum Drive 3 / Apt14",
                interior: "Janitor Apartment",
                renterName: "Xenom Cortez",
                phone: "120-7012",
                income: 2500,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Paid 5/7/2026",
                address: "Forum Drive 3 / Apt15",
                interior: "Janitor Apartment",
                renterName: "Abbas Ali",
                phone: "389-3951",
                income: 2500,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Empty",
                address: "Forum Drive 3 / Apt16",
                interior: "Janitor Apartment",
                renterName: "N/A",
                phone: "N/A",
                income: 0,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Empty",
                address: "Forum Drive 3 / Apt17",
                interior: "Janitor Apartment",
                renterName: "N/A",
                phone: "N/A",
                income: 0,
                cost: 1500,
                storage: 3000
            },
            {
                status: "Empty",
                address: "Forum Drive 3 / Apt18",
                interior: "Janitor Apartment",
                renterName: "N/A",
                phone: "N/A",
                income: 0,
                cost: 1500,
                storage: 3000
            }
        ]
    },
    {
        id: 16,
        name: "Brouge Avenue",
        occupiedProperties: "10/10",
        income: 90000,
        cost: 45000,
        image: "https://i.postimg.cc/d3ppq2Wr/Brouge_Avenue.png",
        storage: 75000,
        properties: [
            {
                status: "Paid 5/11/2026",
                address: "Brouge Avenue 1",
                interior: "Mid-End Apartment (House)",
                renterName: "Lucifer Moningstar",
                phone: "225-3808",
                income: 9000,
                cost: 4500,
                storage: 7500
            },
            {
                status: "Paid 5/11/2026",
                address: "Brouge Avenue 2",
                interior: "Mid-End Apartment (House)",
                renterName: "Lucifer Moningstar",
                phone: "225-3808",
                income: 9000,
                cost: 4500,
                storage: 7500
            },
            {
                status: "Paid 5/11/2026",
                address: "Brouge Avenue 3",
                interior: "Mid-End Apartment (House)",
                renterName: "Lucifer Moningstar",
                phone: "225-3808",
                income: 9000,
                cost: 4500,
                storage: 7500
            },
            {
                status: "Paid 5/11/2026",
                address: "Brouge Avenue 4",
                interior: "Mid-End Apartment (House)",
                renterName: "Lucifer Moningstar",
                phone: "225-3808",
                income: 9000,
                cost: 4500,
                storage: 7500
            },
            {
                status: "Paid 5/11/2026",
                address: "Brouge Avenue 5",
                interior: "Mid-End Apartment (House)",
                renterName: "Lucifer Moningstar",
                phone: "225-3808",
                income: 9000,
                cost: 4500,
                storage: 7500
            },
            {
                status: "Paid 5/11/2026",
                address: "Brouge Avenue 6",
                interior: "Mid-End Apartment (House)",
                renterName: "Lucifer Moningstar",
                phone: "225-3808",
                income: 9000,
                cost: 4500,
                storage: 7500
            },
            {
                status: "Paid 5/11/2026",
                address: "Brouge Avenue 7",
                interior: "Mid-End Apartment (House)",
                renterName: "Hafijur Khan",
                phone: "588-3533",
                income: 9000,
                cost: 4500,
                storage: 7500
            },
            {
                status: "Paid 5/11/2026",
                address: "Brouge Avenue 8",
                interior: "Mid-End Apartment (House)",
                renterName: "Mahin Yakari",
                phone: "353-0112",
                income: 9000,
                cost: 4500,
                storage: 7500
            },
            {
                status: "Paid 5/11/2026",
                address: "Brouge Avenue 9",
                interior: "Mid-End Apartment (House)",
                renterName: "Sam Taylor",
                phone: "303-3881",
                income: 9000,
                cost: 4500,
                storage: 7500
            },
            {
                status: "Paid 5/11/2026",
                address: "Brouge Avenue 10",
                interior: "Mid-End Apartment (House)",
                renterName: "Nahi Tarzan",
                phone: "370-1712",
                income: 9000,
                cost: 4500,
                storage: 7500
            }
        ]
    }
];

const teamMembers = [
    {
        name: "Akkhar Adhikari",
        role: "CEO / Founder",
        phone: "488-1724",
        image: "https://i.postimg.cc/V6WgkjxT/image.png" 
    },
    {
        name: "Freak Carlos",
        role: "COO / CTO",
        phone: "262-3261",
        image: "https://i.postimg.cc/V6WgkjxT/image.png"
    },
    {
        name: "Taz Shayal",
        role: "Manager",
        phone: "555-0103",
        image: "https://i.postimg.cc/V6WgkjxT/image.png"
    },
    {
        name: "Xenom Cortez",
        role: "Realtor",
        phone: "120-7012",
        image: "https://i.postimg.cc/V6WgkjxT/image.png"
    },
    {
        name: "Munshi Jr",
        role: "Realtor",
        phone: "559-3942",
        image: "https://i.postimg.cc/BQ17WLrC/Munshi-Jr.png"
    }
];
