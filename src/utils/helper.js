import HeroSlider from '../assets/images/jpg/hero-1.jpg'
import HeroSlider3 from '../assets/images/jpg/hero-3.jpg'
import HeroSlider4 from '../assets/images/jpg/hero-4.jpg'
import HeroSlider5 from '../assets/images/jpg/hero-5.jpg'
import HeroSlider2 from '../assets/images/jpg/hero-image-2.jpg'
import LevelOneImg from '../assets/images/png/level-one.png'
import LevelTwoImg from '../assets/images/png/level-two.png'
import LevelThreeImg from '../assets/images/png/level-three.png'
import ProfileImg from '../assets/images/png/profile-photo.png'
import ProfilePriya from '../assets/images/png/priya-profile.png'
import StopSymbol from '../assets/images/png/stop-symbol.png'
import onlineCourseImage1 from '../assets/images/png/online-course-1.png'
import Icons from '../components/common/Icons'
import courseImage from '../assets/images/png/course-details-hero.png'
import CompanyLogo from '../assets/images/png/logo-main.png'
import businessAccounting from '../assets/images/jpg/bussiness-accounting.jpg'
import accountExpert from '../assets/images/jpg/account-expert.jpg'
import taxExpert from '../assets/images/jpg/text-exprt.jpg'
import allInOneExpert from '../assets/images/jpg/all-in-one-expert.jpg'
import managerialAccounting from '../assets/images/webp/managerial-accounting.webp'
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
  PAYMENT_METHOD_ROUTE,
  ABOUT_ROUTE,
  STUDENT_SIGNUP_ROUTE,
  CONTACT_ROUTE,
  FORGOT_PASSWORD_ROUTE,
  TERM_AND_CONDITION_ROUTE,
  TWITTER_PATH,
  FACEBOOK_PATH,
  INSTAGRAM_PATH,
} from './constant'
import DashboardUi from '../components/pages/student/dashboard/DashboardUi'
import MyCoursesUi from '../components/pages/student/dashboard/MyCoursesUi'

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
    image: HeroSlider3,
  },
  {
    title: 'Step into Success with Confidence',
    description:
      'Excel in your CA journey with Accountants Club! Dynamic learning, hands-on experience, curated resources, and adaptable schedules designed to suit your needs. Join today and rise to success with fully confident',
    image: HeroSlider4,
  },
  {
    title: 'Empower Your Career with Us',
    description:
      'Take the leap with Accountants Club! Expert coaching, practical insights, detailed materials, and flexible plans to guide you every step of the way. Enroll now and fulfill your aspirations into Success with us',
    image: HeroSlider5,
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
    { name: 'Home', link: HOME_ROUTE },
    { name: 'About Us', link: ABOUT_ROUTE },
    { name: 'Features', link: ABOUT_ROUTE },
    { name: 'Course Info', link: COURSES_ROUTE },
  ],
  'Others Links': [
    { name: "New Student's Registration", link: STUDENT_SIGNUP_ROUTE },
    { name: 'Buy a Course', link: COURSES_ROUTE },
    { name: 'Play Classes', link: COURSES_ROUTE },
    { name: "New Student's Registration", link: STUDENT_SIGNUP_ROUTE },
  ],
  Help: [
    { name: 'Contact Us', link: CONTACT_ROUTE },
    { name: 'Forget password', link: FORGOT_PASSWORD_ROUTE },
    { name: 'FAQs', link: ABOUT_ROUTE },
    { name: 'Terms of Use', link: TERM_AND_CONDITION_ROUTE },
  ],
  'Follow us on': [
    { name: <Icons iconName="twitter" />, link: TWITTER_PATH },
    { name: <Icons iconName="facebook" />, link: FACEBOOK_PATH },
    {
      name: <Icons iconName="instagram" />,
      link: INSTAGRAM_PATH,
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
    heading: 'Business Accounting',
    description:
      'This Course is the first step towards learning of Professional Accounting. Start Converting your bookish knowledge into practical. This course contains very useful information regarding the practical accounting work of Trading, Manufacturing and Service Industry. The course is very useful to all fresher B.Com, M.com, MBA, CA, ICWA, CS and all others who wish to work as a professional accountant in any type of Industry. The course is also very useful for those who has 3-4 year of experience in accounting field. Start learning accounts works with this course now.',
    image: businessAccounting,
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
    enrollPath: PAYMENT_METHOD_ROUTE,
  },
  {
    heading: 'Accounts Expert',
    description:
      'Our Accounts Expert course is based on 100% practical work. Learn Manual and Computerized Accounts from basic to finalization of Balance Sheet in few days. The course is very useful for Professional Accountants who wish to work at very good position in any type of Industry.Along with online video classes, Study Material and Practice Projects also provided to enrolled students. Our Practice which are based on actual business transactions. Through our online training any one can learn professional accounting very easily even you dont have any accounting background.',
    image: accountExpert,
    price: '6,200.00',
    discount: '501',
    language: 'English',
    duration: ' 15h 32min',
    fileNumber: '12',
    subtitle: 'English, Hindi, French, Italian, Russian, Polish, Dutch',
    lessons: '50',
    difficulty: 'Moderate',
    certificate: 'Upon completion of the courses',
    students: '4,000',
    enrollPath: PAYMENT_METHOD_ROUTE,
  },
  {
    heading: 'Tax Expert',
    description:
      'Learn complete Indian Taxation from Basics to filing of online Returns. Our Taxation Expert course provides complete knowledge of Direct and Indirect Tax including GST. The course is based on 100% practical work through project work. This course is very usefull if students have some experience in Business Accounting; otherwise it is recomended to complete our Course-1 and 2 before starting this course. Practice Projects provided to enrolled students, which is based on actual business transactions. Indian taxation explained in a very easy way, anyone can understand in very short duration with perfection.',
    image: taxExpert,
    price: '6,800.00',
    discount: '50',
    language: 'English',
    duration: ' 15h 32min',
    fileNumber: '12',
    subtitle: 'English, Hindi, French, Italian, Russian, Polish, Dutch',
    lessons: '50',
    difficulty: 'Moderate',
    certificate: 'Upon completion of the courses',
    students: '4,000',
    enrollPath: PAYMENT_METHOD_ROUTE,
  },
  {
    heading: 'Accounts and Tax Expert (All in One)',
    description:
      'Our Accounts and Tax Expert course is the combination of Course-1, Course-2 and Course-3. This course includes all contents of our Business Accounting, Accounts Expert and Tax Expert Course. This course is a stunning course for Fresher B.Com, M.Com, MBA, CA, ICWA, CS, Business Men and also who wish to work as good accounts professional. Our Accounting and Taxation Course provide complete practical knowledge from basic to finalization of Balance Sheet and filing of online returns. After successfully completion of the course every candidate can works as a five to seven year experience person.',
    image: allInOneExpert,
    price: '10,800.00',
    discount: '50',
    language: 'English',
    duration: ' 15h 32min',
    fileNumber: '12',
    subtitle: 'English, Hindi, French, Italian, Russian, Polish, Dutch',
    lessons: '50',
    difficulty: 'Moderate',
    certificate: 'Upon completion of the courses',
    students: '4,000',
    enrollPath: PAYMENT_METHOD_ROUTE,
  },
  {
    heading: 'Financial Accounting Fundamentals',
    description:
      'Learn the core principles of financial accounting, including journal entries, financial statements, and reporting. This course is ideal for beginners looking to understand how businesses track financial performance. Understanding the basics of accounting is a crucial skill for almost all finance professionals as it gives us insight into profitability, operations, growth, and the underlying drivers of the business. The Accounting Fundamentals course covers the importance of the financial statements and various financial statement terms. We will record transactions and prepare an multi-year income statement, balance sheet, and cashflow statement.',
    image: onlineCourseImage1,
    price: '15,200',
    discount: '501',
    language: 'English',
    duration: '2h 28min',
    fileNumber: '12',
    subtitle: 'English, Hindi, French, Italian, Russian, Polish, Dutch',
    lessons: '50',
    difficulty: 'Moderate',
    certificate: 'Upon completion of the courses',
    students: '4,000',
    enrollPath: PAYMENT_METHOD_ROUTE,
  },
  {
    heading: 'Managerial Accounting for Decision-Making',
    description:
      'Managerial accountants need to analyze various events and business operations to translate data into useful information that can be leveraged by the company’s management in its decision-making process. Managerial accountants aim to provide detailed information regarding the company’s operations by analyzing areas like product lines, cost accounting, operating activities, and facilities. Financial accounting and managerial accounting are not the same. Whereas managerial accountants focus on internal decision-making, financial accountants prepare the company’s financial statements and financial reports according to Generally Accepted Accounting Principles (GAAP) for external stakeholders, such as investors and lenders. Since managerial accounting is used internally, GAAP does not apply.',
    image: managerialAccounting,
    price: '1,004',
    discount: '50',
    language: 'English',
    duration: ' 15h 32min',
    fileNumber: '12',
    subtitle: 'English, Hindi, French, Italian, Russian, Polish, Dutch',
    lessons: '50',
    difficulty: 'Moderate',
    certificate: 'Upon completion of the courses',
    students: '4,000',
    enrollPath: PAYMENT_METHOD_ROUTE,
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
  { icon: 'dashboard', text: 'Dashboard', component: <DashboardUi /> },
  { icon: 'myCourse', text: 'My Course', component: <MyCoursesUi /> },
  { icon: 'myCertificate', text: 'My Certificate' },
  { icon: 'placement', text: 'Job Placement' },
  { icon: 'jobWork', text: 'Job Work' },
  { icon: 'support', text: 'Support' },
  { icon: 'news', text: 'News & Blog' },
]

export const enrollCourses = [
  {
    id: 1,
    image: courseImage,
    heading: 'Goods & Service Tax',
    description:
      'Learn GST fundamentals, registration, compliance, and return filing with step-by-step guidance.',
  },
  {
    id: 2,
    image: courseImage,
    heading: 'Income Tax Basics',
    description:
      'Understand the basics of income tax, including tax slabs, deductions, and filing procedures.',
  },
  {
    id: 3,
    image: courseImage,
    heading: 'Corporate Finance',
    description:
      'Gain insights into corporate finance, including financial statements, valuation, and investment decisions.',
  },
]

export const accordionData = [
  {
    title: 'Chapter -1 Basics of Accounting',
    lessons: [
      { name: 'Lesson -1: Introduction of Business', completed: true },
      { name: 'Lesson -2: Role of Works Structure', completed: true },
      { name: 'Lesson -3: Shortcut Keys in Tally', completed: false },
      { name: 'Lesson -4: Role of Works Structure', completed: false },
      { name: 'Lesson -5: Role of Works Structure', completed: false },
    ],
  },
  {
    title: 'Chapter -2 Manual Accounting',
    lessons: [
      { name: 'Lesson -1: Introduction of Business', completed: true },
      { name: 'Lesson -2: Role of Works Structure', completed: true },
      { name: 'Lesson -3: Shortcut Keys in Tally', completed: false },
      { name: 'Lesson -4: Role of Works Structure', completed: false },
      { name: 'Lesson -5: Role of Works Structure', completed: false },
    ],
  },
  {
    title: 'Chapter -3 Computer Accounting',
    lessons: [
      { name: 'Lesson -1: Introduction of Business', completed: true },
      { name: 'Lesson -2: Role of Works Structure', completed: true },
      { name: 'Lesson -3: Shortcut Keys in Tally', completed: false },
      { name: 'Lesson -4: Role of Works Structure', completed: false },
      { name: 'Lesson -5: Role of Works Structure', completed: false },
    ],
  },
  {
    title: 'Chapter -4 Inventory Accounting',
    lessons: [
      { name: 'Lesson -1: Introduction of Business', completed: true },
      { name: 'Lesson -2: Role of Works Structure', completed: true },
      { name: 'Lesson -3: Shortcut Keys in Tally', completed: false },
      { name: 'Lesson -4: Role of Works Structure', completed: false },
      { name: 'Lesson -5: Role of Works Structure', completed: false },
    ],
  },
]
export const testData = [
  {
    srNo: '01',
    date: '01/01/22',
    lesson: '1/1',
    topic: 'Introduction of Business',
    questions: 5,
    correct: 4,
    score: '15/20',
    percentage: 75,
  },
  {
    srNo: '02',
    date: '02/01/22',
    lesson: '1/2',
    topic: 'Role of Work Structure',
    questions: 5,
    correct: 5,
    score: '20/20',
    percentage: 100,
  },
  {
    srNo: '03',
    date: '03/01/22',
    lesson: '1/3',
    topic: 'Project Solutions',
    questions: 5,
    correct: 4,
    score: '15/20',
    percentage: 100,
  },
  {
    srNo: '04',
    date: '04/01/22',
    lesson: '1/4',
    topic: 'Shortcuts key in Tally',
    questions: 5,
    correct: 5,
    score: '20/20',
    percentage: 100,
  },
  {
    srNo: '05',
    date: '05/01/22',
    lesson: '1/5',
    topic: 'Introduction of Business',
    questions: 5,
    correct: 4,
    score: '15/20',
    percentage: 100,
  },
  {
    srNo: '06',
    date: '06/01/22',
    lesson: '1/6',
    topic: 'Primary Books of Entry',
    questions: 5,
    correct: 5,
    score: '20/20',
    percentage: 100,
  },
]
export const jobListArray = [
  {
    positionName: 'Chartered Accountant',
    companyName: 'Accountants Club',
    status: 'Actively Hiring',
    aboutJob:
      'Are you a qualified Chartered Accountant eager to start your career in direct and indirect taxation? We are looking for CA freshers who have completed their articleship in taxation and want to build a strong foundation in finance.',
    companyLogo: CompanyLogo,
    keyResponsibilities: [
      'Tax Compliance: Prepare and file tax returns (Direct & Indirect).',
      'Regulatory Research: Ensure compliance with taxation laws.',
      'Tax Planning & Advisory: Assist in strategic tax planning.',
      'Audits & Financials: Support statutory audits & financial statement preparation.',
    ],
    eligibilityCriteria: [
      'Qualified CA (with taxation-focused articleship).',
      'First attempt candidates preferred.',
      'Female candidates encouraged to apply.',
      'Proficient in MS Office & accounting software.',
    ],
    workType: 'Work from Office',
    salary: '18,00,000 - 10,00,000',
    workExperience: '2 year(s)',
    postDate: '2 days ago',
  },
  {
    positionName: 'Senior Accountant',
    companyName: 'Accountants Club',
    status: 'Actively Hiring',
    aboutJob:
      'Are you a qualified Chartered Accountant eager to start your career in direct and indirect taxation? We are looking for CA freshers who have completed their articleship in taxation and want to build a strong foundation in finance.',
    companyLogo: CompanyLogo,
    keyResponsibilities: [
      'Tax Compliance: Prepare and file tax returns (Direct & Indirect).',
      'Regulatory Research: Ensure compliance with taxation laws.',
      'Tax Planning & Advisory: Assist in strategic tax planning.',
      'Audits & Financials: Support statutory audits & financial statement preparation.',
    ],
    eligibilityCriteria: [
      'Qualified CA (with taxation-focused articleship).',
      'First attempt candidates preferred.',
      'Female candidates encouraged to apply.',
      'Proficient in MS Office & accounting software.',
    ],
    companyLogo: CompanyLogo,
    workType: 'Work from Home',
    aboutJob:
      'Are you a qualified Chartered Accountant eager to start your career in direct and indirect taxation? We are looking for CA freshers who have completed their articleship in taxation and want to build a strong foundation in finance.',
    companyLogo: CompanyLogo,
    keyResponsibilities: [
      'Tax Compliance: Prepare and file tax returns (Direct & Indirect).',
      'Regulatory Research: Ensure compliance with taxation laws.',
      'Tax Planning & Advisory: Assist in strategic tax planning.',
      'Audits & Financials: Support statutory audits & financial statement preparation.',
    ],
    eligibilityCriteria: [
      'Qualified CA (with taxation-focused articleship).',
      'First attempt candidates preferred.',
      'Female candidates encouraged to apply.',
      'Proficient in MS Office & accounting software.',
    ],
    salary: '18,00,000 - 10,00,000',
    workExperience: '2 year(s)',
    postDate: '5 days ago',
  },
  {
    positionName: 'Chartered Accountant',
    companyName: 'Accountants Club',
    status: 'Actively Hiring',
    aboutJob:
      'Are you a qualified Chartered Accountant eager to start your career in direct and indirect taxation? We are looking for CA freshers who have completed their articleship in taxation and want to build a strong foundation in finance.',
    companyLogo: CompanyLogo,
    keyResponsibilities: [
      'Tax Compliance: Prepare and file tax returns (Direct & Indirect).',
      'Regulatory Research: Ensure compliance with taxation laws.',
      'Tax Planning & Advisory: Assist in strategic tax planning.',
      'Audits & Financials: Support statutory audits & financial statement preparation.',
    ],
    eligibilityCriteria: [
      'Qualified CA (with taxation-focused articleship).',
      'First attempt candidates preferred.',
      'Female candidates encouraged to apply.',
      'Proficient in MS Office & accounting software.',
    ],
    companyLogo: CompanyLogo,
    workType: 'Part Time',
    salary: '18,00,000 - 10,00,000',
    workExperience: '2 year(s)',
    postDate: '3 days ago',
  },
  {
    positionName: 'Senior Accountant',
    companyName: 'Accountants Club',
    status: 'Actively Hiring',
    aboutJob:
      'Are you a qualified Chartered Accountant eager to start your career in direct and indirect taxation? We are looking for CA freshers who have completed their articleship in taxation and want to build a strong foundation in finance.',
    companyLogo: CompanyLogo,
    keyResponsibilities: [
      'Tax Compliance: Prepare and file tax returns (Direct & Indirect).',
      'Regulatory Research: Ensure compliance with taxation laws.',
      'Tax Planning & Advisory: Assist in strategic tax planning.',
      'Audits & Financials: Support statutory audits & financial statement preparation.',
    ],
    eligibilityCriteria: [
      'Qualified CA (with taxation-focused articleship).',
      'First attempt candidates preferred.',
      'Female candidates encouraged to apply.',
      'Proficient in MS Office & accounting software.',
    ],
    companyLogo: CompanyLogo,
    workType: 'Work from Home',
    salary: '18,00,000 - 10,00,000',
    workExperience: '2 year(s)',
    postDate: '5 days ago',
  },
]
