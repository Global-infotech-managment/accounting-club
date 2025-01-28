import HeroSlider from '../assets/images/png/hero-slider.png'
import HeroSlider2 from '../assets/images/jpg/hero-image-2.jpg'
import LevelOneImg from '../assets/images/png/level-one.png'
import LevelTwoImg from '../assets/images/png/level-two.png'
import LevelThreeImg from '../assets/images/png/level-three.png'
import ProfileImg from '../assets/images/png/profile-photo.png'
import ProfilePriya from '../assets/images/png/priya-profile.png'
import StopSymbol from '../assets/images/png/stop-symbol.png'
import Icons from '../components/common/Icons'

export const navLinks = [
  {
    title: 'Home',
    url: '#home',
  },
  {
    title: 'Features',
    url: '#features',
  },
  {
    title: 'Course info',
    url: '#course-info',
  },
  {
    title: 'Admission',
    url: '#admission',
  },
  {
    title: 'Employers',
    url: '#',
    subLinks: [
      {
        title: 'Employers Login',
        url: '/product-one',
      },
      {
        title: 'Employers Register',
        url: '/product-two',
      },
    ],
  },
]

export const slides = [
  {
    title: 'CA Course with Accountants Club',
    description:
      'Accelerate your CA journey with Accountants Club! Expert-led online classes, practical insights, comprehensive study materials, and flexible schedules designed to help you excel. Enroll today and achieve your goals!',
    image: HeroSlider,
  },
  {
    title: 'Achieve Your Goals with Our Experts',
    description:
      'Transform your career with Accountants Club! Comprehensive study plans, expert guidance, practical knowledge, and flexible schedules tailored for your success. Join us now and begin your journey! today.',
    image: HeroSlider2,
  },
  {
    title: 'Unlock Your Potential with Us',
    description:
      'Reach your career milestones with Accountants Club! High-quality classes, experienced mentors, interactive resources, and flexible learning options to empower you. Start your path to excellence today with us.',
    image: HeroSlider,
  },
  {
    title: 'Step into Success with Confidence',
    description:
      'Excel in your CA journey with Accountants Club! Dynamic learning, hands-on experience, curated resources, and adaptable schedules designed to suit your needs. Join today and rise to success with fully confident',
    image: HeroSlider,
  },
  {
    title: 'Empower Your Career with Us',
    description:
      'Take the leap with Accountants Club! Expert coaching, practical insights, detailed materials, and flexible plans to guide you every step of the way. Enroll now and fulfill your aspirations into Success with us',
    image: HeroSlider,
  },
]

export const onlineCourse = [
  {
    iconName: 'business',
    title: 'Business Accounting',
    levelImg: LevelOneImg,
    desc: 'This is a starter course for fresher Students. With this course convert your knowledge into practical from your bookish.',
    readMore: 'Read more',
  },
  {
    iconName: 'account',
    title: 'Accounts Expert',
    levelImg: LevelTwoImg,
    desc: 'Learn complete Manual and Computerized Accounts form basic to finalization of balance sheet with practical projects.',
    readMore: 'Read more',
  },
  {
    iconName: 'expert',
    title: 'Taxation Expert',
    levelImg: LevelThreeImg,
    desc: 'Learn Income Tax, TDS, TCS, GST, EPF, ESI, payrolls up to filing of online Returns with project work.',
    readMore: 'Read more',
  },
  {
    iconName: 'account',
    title: 'Accounts Expert',
    levelImg: LevelTwoImg,
    desc: 'Learn complete Manual and Computerized Accounts form basic to finalization of balance sheet with practical projects.',
    readMore: 'Read more',
  },
  {
    iconName: 'expert',
    title: 'Taxation Expert',
    levelImg: LevelThreeImg,
    desc: 'Learn Income Tax, TDS, TCS, GST, EPF, ESI, payrolls up to filing of online Returns with project work.',
    readMore: 'Read more',
  },
  {
    iconName: 'business',
    title: 'Business Accounting',
    levelImg: LevelOneImg,
    desc: 'This is a starter course for fresher Students. With this course convert your knowledge into practical from your bookish.',
    readMore: 'Read more',
  },
]

export const studentData = [
  {
    id: 1,
    title: 'Exceptional Training!',
    text: 'Thanks to the practical techniques, I secured a great job immediately after completing my course. Truly life-changing!',
    name: 'Yogesh Rajput',
    profileImg: ProfileImg,
    stopSymbol: StopSymbol,
  },
  {
    id: 2,
    title: 'Practical & Professional!',
    text: 'The course content was tailored perfectly to industry needs. I feel fully prepared to handle real-world accounting challenges now.',
    name: 'Priya Sharma',
    profileImg: ProfilePriya,
    stopSymbol: StopSymbol,
  },
]

export const menuData = {
  'Quick Links': [
    { name: 'Home', link: '#home' },
    { name: 'About Us', link: '#about-us' },
    { name: 'Features', link: '#features' },
    { name: 'Course Info', link: '#course-info' },
  ],
  'Others Links': [
    { name: "New Student's Registration", link: '/sign-up' },
    { name: 'Buy a Course', link: '/' },
    { name: 'Play Classes', link: '/' },
    { name: "New Student's Registration", link: '/sign-up' },
  ],
  Help: [
    { name: 'Contact Us', link: '/contact-us' },
    { name: 'Forget password', link: '/' },
    { name: 'FAQs', link: '/faq' },
    { name: 'Terms of Use', link: '/terms' },
  ],
  'Follow us on': [
    { name: <Icons iconName="twitter" />, link: 'https://x.com/?lang=en&mx=2' },
    { name: <Icons iconName="facebook" />, link: 'https://www.facebook.com' },
    {
      name: <Icons iconName="instagram" />,
      link: 'https://www.instagram.com/',
    },
  ],
}
export const chooseUsContent = [
  [
    {
      btnText: 'Free Classes',
      icon: <Icons iconName="freeCourses" />,
      title: 'Free Classes',
      para: 'Our Level 1 Course is 100% free. You can start the course without any payment. If you feel comfortable, you can upgrade to the next level.',
    },
    {
      btnText: 'Free Classes',
      icon: <Icons iconName="freeCourses" />,
      title: 'Free Classes',
      para: 'Our Level 1 Course is 100% free. You can start the course without any payment. If you feel comfortable, you can upgrade to the next level.',
    },
    {
      btnText: 'Free Classes',
      icon: <Icons iconName="freeCourses" />,
      title: 'Free Classes',
      para: 'Our Level 1 Course is 100% free. You can start the course without any payment. If you feel comfortable, you can upgrade to the next level.',
    },
  ],
  [
    {
      btnText: 'Online Classes',
      icon: <Icons iconName="onlineClasses" />,
      title: 'Online Classes',
      para: 'All our classes are conducted online with live interaction and support from our expert instructors. You can upgrade the course to the next level.',
    },
    {
      btnText: 'Online Classes',
      icon: <Icons iconName="onlineClasses" />,
      title: 'Online Classes',
      para: 'All our classes are conducted online with live interaction and support from our expert instructors. You can upgrade the course to the next level.',
    },
    {
      btnText: 'Online Classes',
      icon: <Icons iconName="onlineClasses" />,
      title: 'Online Classes',
      para: 'All our classes are conducted online with live interaction and support from our expert instructors. You can upgrade the course to the next level.',
    },
  ],
  [
    {
      btnText: 'Flexibility',
      icon: <Icons iconName="freeCourses" />,
      title: 'Flexibility',
      para: 'Learn at your own pace with flexible scheduling and access to recorded sessions. You can upgrade the course to the next level.',
    },
    {
      btnText: 'Flexibility',
      icon: <Icons iconName="freeCourses" />,
      title: 'Flexibility',
      para: 'Learn at your own pace with flexible scheduling and access to recorded sessions. You can upgrade the course to the next level.',
    },
    {
      btnText: 'Flexibility',
      icon: <Icons iconName="freeCourses" />,
      title: 'Flexibility',
      para: 'Learn at your own pace with flexible scheduling and access to recorded sessions. You can upgrade the course to the next level.',
    },
  ],
  [
    {
      btnText: 'Practice Project',
      icon: <Icons iconName="onlineClasses" />,
      title: 'Practice Project',
      para: 'Get hands-on experience with real-world projects and practical assignments. You can upgrade the course to the next level.',
    },
    {
      btnText: 'Practice Project',
      icon: <Icons iconName="onlineClasses" />,
      title: 'Practice Project',
      para: 'Get hands-on experience with real-world projects and practical assignments. You can upgrade the course to the next level.',
    },
    {
      btnText: 'Practice Project',
      icon: <Icons iconName="onlineClasses" />,
      title: 'Practice Project',
      para: 'Get hands-on experience with real-world projects and practical assignments. You can upgrade the course to the next level.',
    },
  ],
]

