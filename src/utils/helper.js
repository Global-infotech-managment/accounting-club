import HeroSlider from "../assets/images/png/hero-slider.png";
import LevelOneImg from '../assets/images/png/level-one.png'
import LevelTwoImg from '../assets/images/png/level-two.png'
import LevelThreeImg from '../assets/images/png/level-three.png'

export const NAV_LINKS = [
    {
        title: "Home",
        url: "/",
    },
    {
        title: "Features",
        url: "/features",
    },
    {
        title: "Course info",
        url: "/course-info",
    },
    {
        title: "Admission",
        url: "/admission",
    },
    {
        title: "More",
        url: "/more",
        subLinks: [
            {
                title: "Product 1",
                url: "/product-one",
            },
            {
                title: "Product 2",
                url: "/product-two",
            },
        ],
    },
];

export const slides = [
    {
        title: "CA Course with Accountants Club",
        description:
            "Accelerate your CA journey with Accountants Club! Expert-led online classes, practical insights, comprehensive study materials, and flexible schedules designed to help you excel. Enroll today and achieve your goals!",
        image: HeroSlider,
    },
    {
        title: "Start Your Career with ours Team",
        description:
            "Accelerate your CA journey with Accountants Club! Expert-led online classes, practical insights, comprehensive study materials, and flexible schedules designed to help you excel. Enroll today and achieve your goals!",
        image: HeroSlider,
    },
    {
        title: "Your CA Journey Starts from Here",
        description:
            "Accelerate your CA journey with Accountants Club! Expert-led online classes, practical insights, comprehensive study materials, and flexible schedules designed to help you excel. Enroll today and achieve your goals!",
        image: HeroSlider,
    },
];

export const onlineCourse = [
    {
        iconName: "business",
        title: "Business Accounting",
        levelImg: LevelOneImg,
        desc: "This is a starter course for fresher Students. With this course convert your knowledge into practical from your bookish.",
        readMore: "Read more",
    },
    {
        iconName: "account",
        title: "Accounts Expert",
        levelImg: LevelTwoImg,
        desc: "Learn complete Manual and Computerized Accounts form basic to finalization of balance sheet with practical projects.",
        readMore: "Read more",
    },
    {
        iconName: "expert",
        title: "Taxation Expert",
        levelImg: LevelThreeImg,
        desc: "Learn Income Tax, TDS, TCS, GST, EPF, ESI, payrolls up to filing of online Returns with project work.",
        readMore: "Read more",
    },
    {
        iconName: "account",
        title: "Accounts Expert",
        levelImg: LevelTwoImg,
        desc: "Learn complete Manual and Computerized Accounts form basic to finalization of balance sheet with practical projects.",
        readMore: "Read more",
    },
    {
        iconName: "expert",
        title: "Taxation Expert",
        levelImg: LevelThreeImg,
        desc: "Learn Income Tax, TDS, TCS, GST, EPF, ESI, payrolls up to filing of online Returns with project work.",
        readMore: "Read more",
    },
    {
        iconName: "business",
        title: "Business Accounting",
        levelImg: LevelOneImg,
        desc: "This is a starter course for fresher Students. With this course convert your knowledge into practical from your bookish.",
        readMore: "Read more",
    },
]