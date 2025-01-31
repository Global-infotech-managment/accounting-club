import HeroSlider from '../assets/images/png/hero-slider.png'
import HeroSlider2 from '../assets/images/jpg/hero-image-2.jpg'
import LevelOneImg from '../assets/images/png/level-one.png'
import LevelTwoImg from '../assets/images/png/level-two.png'
import LevelThreeImg from '../assets/images/png/level-three.png'
import ProfileImg from '../assets/images/png/profile-photo.png'
import ProfilePriya from '../assets/images/png/priya-profile.png'
import StopSymbol from '../assets/images/png/stop-symbol.png'
import onlineCourseImage1 from '../assets/images/png/online-course-1.png'
import Icons from '../components/common/Icons'
import {
  COURSES_ROUTE,
  HOME_ROUTE,
  POST_RESUME_ROUTE,
  SEARCH_ACCOUNTING_JOBS_ROUTE,
  SEARCH_WORK_FROM_HOME_JOBS_ROUTE,
  VERIFY_CERTIFICATE_ROUTE,
  CHARTERED_ACCOUNTANT_ROUTE,
  EMPLOYER_LOGIN_ROUTE,
  EMPLOYER_REGISTER_ROUTE,
} from './constant'

export const navLinks = [
  {
    title: 'Home',
    url: HOME_ROUTE,
  },
  {
    title: 'Courses',
    url: COURSES_ROUTE,
  },
  {
    title: 'Jobs',
    subLinks: [
      {
        title: 'Post Your Resume',
        url: POST_RESUME_ROUTE,
      },
      {
        title: 'Search Accounting Jobs',
        url: SEARCH_ACCOUNTING_JOBS_ROUTE,
      },
      {
        title: 'Search Work From Home Jobs',
        url: SEARCH_WORK_FROM_HOME_JOBS_ROUTE,
      },
    ],
  },
  {
    title: 'Services',
    subLinks: [
      {
        title: 'Verify Certificate',
        url: VERIFY_CERTIFICATE_ROUTE,
      },
      {
        title: 'Chartered Accountant',
        url: CHARTERED_ACCOUNTANT_ROUTE,
      },
    ],
  },
  {
    title: 'Employers',
    url: '#',
    subLinks: [
      {
        title: 'Employers Login',
        url: EMPLOYER_LOGIN_ROUTE,
      },
      {
        title: 'Employers Register',
        url: EMPLOYER_REGISTER_ROUTE,
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
export const onlineCoursesData = [
  {
    heading: 'Online Courses',
    description:
      'Learn from the best in the industry with our online courses. You can upgrade the course to the next level.Learn from the best in the industry with our online courses. You can upgrade the course to the next level.Learn from the best in the industry with our online courses. You can upgrade the course to the next level.',
    image: onlineCourseImage1,
    price: '1004',
    discount: '50',
    language: 'English',
    duration: ' 15h 32min',
    fileNumber: '12',
    subtitle: 'English, Hindi, French, Italian, Russian, Polish, Dutch',
    lessons: '50',
    difficulty: 'Moderate',
    certificate: 'Upon completion of the courses',
    students: '4,000',
    enrollPath: '#',
  },
  {
    heading: 'Onxczvline Courses',
    description:
      'Learn from the best in the industry with our online courses. You can upgrade the course to the next level.Learn from the best in the industry with our online courses. You can upgrade the course to the next level.Learn from the best in the industry with our online courses. You can upgrade the course to the next level.',
    image: onlineCourseImage1,
    price: '1040',
    discount: '501',
    language: 'English',
    duration: ' 15h 32min',
    fileNumber: '12',
    subtitle: 'English, Hindi, French, Italian, Russian, Polish, Dutch',
    lessons: '50',
    difficulty: 'Moderate',
    certificate: 'Upon completion of the courses',
    students: '4,000',
    enrollPath: '#',
  },
  {
    heading: 'Onsdfvbline Courses',
    description:
      'Learn from the best in the industry with our online courses. You can upgrade the course to the next level.Learn from the best in the industry with our online courses. You can upgrade the course to the next level.Learn from the best in the industry with our online courses. You can upgrade the course to the next level.',
    image: onlineCourseImage1,
    price: '1004',
    discount: '50',
    language: 'English',
    duration: ' 15h 32min',
    fileNumber: '12',
    subtitle: 'English, Hindi, French, Italian, Russian, Polish, Dutch',
    lessons: '50',
    difficulty: 'Moderate',
    certificate: 'Upon completion of the courses',
    students: '4,000',
    enrollPath: '#',
  },
]
// all country
export const CountryList = [
  { label: 'Afghanistan', value: 'Afghanistan' },
  { label: 'Albania', value: 'Albania' },
  { label: 'Algeria', value: 'Algeria' },
  { label: 'Andorra', value: 'Andorra' },
  { label: 'Angola', value: 'Angola' },
  {
    label: 'Antigua and Barbuda',
    value: 'Antigua and Barbuda',
  },
  { label: 'Argentina', value: 'Argentina' },
  { label: 'Armenia', value: 'Armenia' },
  { label: 'Australia', value: 'Australia' },
  { label: 'Austria', value: 'Austria' },
  { label: 'Azerbaijan', value: 'Azerbaijan' },
  { label: 'Bahamas', value: 'Bahamas' },
  { label: 'Bahrain', value: 'Bahrain' },
  { label: 'Bangladesh', value: 'Bangladesh' },
  { label: 'Barbados', value: 'Barbados' },
  { label: 'Belarus', value: 'Belarus' },
  { label: 'Belgium', value: 'Belgium' },
  { label: 'Belize', value: 'Belize' },
  { label: 'Benin', value: 'Benin' },
  { label: 'Bhutan', value: 'Bhutan' },
  { label: 'Bolivia', value: 'Bolivia' },
  {
    label: 'Bosnia and Herzegovina',
    value: 'Bosnia and Herzegovina',
  },
  { label: 'Botswana', value: 'Botswana' },
  { label: 'Brazil', value: 'Brazil' },
  { label: 'Brunei', value: 'Brunei' },
  { label: 'Bulgaria', value: 'Bulgaria' },
  { label: 'Burkina Faso', value: 'Burkina Faso' },
  { label: 'Burundi', value: 'Burundi' },
  { label: 'Cabo Verde', value: 'Cabo Verde' },
  { label: 'Cambodia', value: 'Cambodia' },
  { label: 'Cameroon', value: 'Cameroon' },
  { label: 'Canada', value: 'Canada' },
  {
    label: 'Central African Republic',
    value: 'Central African Republic',
  },
  { label: 'Chad', value: 'Chad' },
  { label: 'Chile', value: 'Chile' },
  { label: 'China', value: 'China' },
  { label: 'Colombia', value: 'Colombia' },
  { label: 'Comoros', value: 'Comoros' },
  { label: 'Congo (Congo-Brazzaville)', value: 'Congo' },
  { label: 'Costa Rica', value: 'Costa Rica' },
  { label: 'Croatia', value: 'Croatia' },
  { label: 'Cuba', value: 'Cuba' },
  { label: 'Cyprus', value: 'Cyprus' },
  { label: 'Czech Republic', value: 'Czech Republic' },
  { label: 'Denmark', value: 'Denmark' },
  { label: 'Djibouti', value: 'Djibouti' },
  { label: 'Dominica', value: 'Dominica' },
  { label: 'Dominican Republic', value: 'Dominican Republic' },
  { label: 'Ecuador', value: 'Ecuador' },
  { label: 'Egypt', value: 'Egypt' },
  { label: 'El Salvador', value: 'El Salvador' },
  { label: 'Estonia', value: 'Estonia' },
  { label: 'Eswatini', value: 'Eswatini' },
  { label: 'Ethiopia', value: 'Ethiopia' },
  { label: 'Fiji', value: 'Fiji' },
  { label: 'Finland', value: 'Finland' },
  { label: 'France', value: 'France' },
  { label: 'Gabon', value: 'Gabon' },
  { label: 'Gambia', value: 'Gambia' },
  { label: 'Georgia', value: 'Georgia' },
  { label: 'Germany', value: 'Germany' },
  { label: 'Ghana', value: 'Ghana' },
  { label: 'Greece', value: 'Greece' },
  { label: 'Grenada', value: 'Grenada' },
  { label: 'Guatemala', value: 'Guatemala' },
  { label: 'Guinea', value: 'Guinea' },
  { label: 'Guyana', value: 'Guyana' },
  { label: 'Haiti', value: 'Haiti' },
  { label: 'Honduras', value: 'Honduras' },
  { label: 'Hungary', value: 'Hungary' },
  { label: 'Iceland', value: 'Iceland' },
  { label: 'India', value: 'India' },
  { label: 'Indonesia', value: 'Indonesia' },
  { label: 'Iran', value: 'Iran' },
  { label: 'Iraq', value: 'Iraq' },
  { label: 'Ireland', value: 'Ireland' },
  { label: 'Israel', value: 'Israel' },
  { label: 'Italy', value: 'Italy' },
  { label: 'Jamaica', value: 'Jamaica' },
  { label: 'Japan', value: 'Japan' },
  { label: 'Jordan', value: 'Jordan' },
  { label: 'Kazakhstan', value: 'Kazakhstan' },
  { label: 'Kenya', value: 'Kenya' },
  { label: 'Kuwait', value: 'Kuwait' },
  { label: 'Latvia', value: 'Latvia' },
  { label: 'Lebanon', value: 'Lebanon' },
  { label: 'Malaysia', value: 'Malaysia' },
  { label: 'Maldives', value: 'Maldives' },
  { label: 'Mexico', value: 'Mexico' },
  { label: 'Mongolia', value: 'Mongolia' },
  { label: 'Morocco', value: 'Morocco' },
  { label: 'Myanmar', value: 'Myanmar' },
  { label: 'Nepal', value: 'Nepal' },
  { label: 'Netherlands', value: 'Netherlands' },
  { label: 'New Zealand', value: 'New Zealand' },
  { label: 'Nigeria', value: 'Nigeria' },
  { label: 'North Korea', value: 'North Korea' },
  { label: 'Norway', value: 'Norway' },
  { label: 'Pakistan', value: 'Pakistan' },
  { label: 'Peru', value: 'Peru' },
  { label: 'Philippines', value: 'Philippines' },
  { label: 'Poland', value: 'Poland' },
  { label: 'Portugal', value: 'Portugal' },
  { label: 'Qatar', value: 'Qatar' },
  { label: 'Romania', value: 'Romania' },
  { label: 'Russia', value: 'Russia' },
  { label: 'Saudi Arabia', value: 'Saudi Arabia' },
  { label: 'Singapore', value: 'Singapore' },
  { label: 'South Africa', value: 'South Africa' },
  { label: 'South Korea', value: 'South Korea' },
  { label: 'Spain', value: 'Spain' },
  { label: 'Sri Lanka', value: 'Sri Lanka' },
  { label: 'Sweden', value: 'Sweden' },
  { label: 'Switzerland', value: 'Switzerland' },
  { label: 'Thailand', value: 'Thailand' },
  { label: 'Turkey', value: 'Turkey' },
  {
    label: 'United Arab Emirates',
    value: 'United Arab Emirates',
  },
  { label: 'United Kingdom', value: 'United Kingdom' },
  { label: 'United States', value: 'United States' },
  { label: 'Vietnam', value: 'Vietnam' },
  { label: 'Zambia', value: 'Zambia' },
  { label: 'Zimbabwe', value: 'Zimbabwe' },
]

export const studentSidebarItems = [
  { icon: 'dashboard', text: 'Dashboard' },
  { icon: 'myCourse', text: 'My Course' },
  { icon: 'myCertificate', text: 'My Certificate' },
  { icon: 'placement', text: 'Job Placement' },
  { icon: 'jobWork', text: 'Job Work' },
  { icon: 'support', text: 'Support' },
  { icon: 'news', text: 'News & Blog' },
]
