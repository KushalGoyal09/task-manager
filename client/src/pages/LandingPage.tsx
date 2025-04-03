import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import { CheckCircle, List, BarChart2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: <CheckCircle className="h-6 w-6 text-green-500" />,
    title: "Task Tracking",
    description:
      "Keep track of all your tasks in one place with status updates and progress indicators.",
  },

  {
    icon: <List className="h-6 w-6 text-purple-500" />,
    title: "Organize & Categorize",
    description: "Sort and filter tasks by date and status.",
  },
  {
    icon: <BarChart2 className="h-6 w-6 text-indigo-500" />,
    title: "Progress Analytics",
    description:
      "Get insights into your productivity with visual statistics and completion rates.",
  },
];

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const heroImageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 70,
        delay: 0.2,
      },
    },
  };

  return (
    <div className="bg-white">
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-50 to-indigo-50 py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <motion.div
                initial="hidden"
                animate="visible"
                variants={containerVariants}
              >
                <motion.h1
                  className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl"
                  variants={itemVariants}
                >
                  <span className="block">Simplify Your</span>
                  <span className="block text-blue-600">Task Management</span>
                </motion.h1>
                <motion.p
                  className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0"
                  variants={itemVariants}
                >
                  Stay organized, focused, and in control with our intuitive
                  task management solution. Boost your productivity with smart
                  features designed to make task management effortless.
                </motion.p>
                <motion.div
                  className="mt-8 sm:flex sm:justify-center lg:justify-start"
                  variants={itemVariants}
                >
                  <div className="rounded-md shadow">
                    <Button
                      size="lg"
                      onClick={() => navigate("/register")}
                      className="w-full flex items-center justify-center"
                    >
                      Get Started Free
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => navigate("/login")}
                      className="w-full"
                    >
                      Log In
                    </Button>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <motion.div
                className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md"
                variants={heroImageVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                  <img
                    className="w-full"
                    src="/image.png"
                    alt="Task management dashboard"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-4 sm:p-6 text-white">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                      >
                        <p className="text-sm sm:text-base font-medium">
                          Intuitive dashboard with everything at your fingertips
                        </p>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 bg-white sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInVariants}
            className="text-center"
          >
            <h2 className="text-base font-semibold tracking-wide text-blue-600 uppercase">
              Features
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Everything you need to stay productive
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500">
              Our task management app is packed with features to help you
              organize your work and boost your productivity.
            </p>
          </motion.div>

          <div className="mt-16">
            <motion.div
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={containerVariants}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="relative p-6 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-50 mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-base text-gray-500">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInVariants}
            className="text-center"
          >
            <h2 className="text-base font-semibold tracking-wide text-blue-600 uppercase">
              How It Works
            </h2>
            <p className="mt-1 text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight">
              Simple steps to get started
            </p>
          </motion.div>

          <div className="mt-16">
            <motion.div
              className="grid gap-8 md:grid-cols-3"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              variants={containerVariants}
            >
              <motion.div className="text-center" variants={itemVariants}>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-900 text-2xl font-bold">
                  1
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  Create an account
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Sign up for free and create your personal workspace.
                </p>
              </motion.div>

              <motion.div className="text-center" variants={itemVariants}>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-900 text-2xl font-bold">
                  2
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  Add your tasks
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Create tasks, add descriptions, and set their status.
                </p>
              </motion.div>

              <motion.div className="text-center" variants={itemVariants}>
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-900 text-2xl font-bold">
                  3
                </div>
                <h3 className="mt-6 text-xl font-medium text-gray-900">
                  Stay organized
                </h3>
                <p className="mt-2 text-base text-gray-500">
                  Track progress, update status, and complete your tasks.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="bg-blue-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to dive in?</span>
            <span className="block text-blue-200">
              Start managing your tasks today.
            </span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => navigate("/register")}
              >
                Get started
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <p className="text-base text-gray-400 xl:text-center">
            &copy; {new Date().getFullYear()} TaskMaster, Inc. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
