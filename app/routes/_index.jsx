import { Form, Link, json, useActionData, useNavigation } from "@remix-run/react";
import FormSpacer from "~/components/FormSpacer";
import { BusinessDealIllustration, FacebookIcon, InstagramIcon, MoneyTransferIllustration, PaymentsIllustration, ProfileIllustration, ThreeDots, TiktokIcon, WaitlistIllustration, XIcon } from "~/components/Icon";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { validateName, validateEmail, badRequest } from "~/.server/validation";
import { subscribe } from "~/.server/email";
import { useEffect, useRef } from "react";

export const meta = () => {
	return [
		{ title: "New Remix App" },
		{ name: "description", content: "Welcome to Remix!" },
	];
};

export async function action({ request }) {
	let formData = await request.formData();
	let action = formData.get('_action');

	switch (action) {
		case 'waitlist': {
			let name = formData.get('name');
			let email = formData.get('email');

			let fieldErrors = {
				name: validateName(name),
				email: validateEmail(email)
			};

			if (Object.values(fieldErrors).some(Boolean)) {
				return badRequest({ fieldErrors });
			}

			return json({ id: 1 });



			let { id } = await subscribe(name, email);

			if (id) {
				return json({ id });
			}
		}
	}
	return null;
}

export default function Index() {
	return (
		<main className="bg-brand-black text-gray-200">
			<Hero />
			<HowItWorks />
			<div className="mt-24 md:mt-36 lg:mt-40 px-6 md:px-12 xl:px-0 lg:max-w-6xl mx-auto h-96 lg:h-[500px]">
				<img src="https://blog.deriv.com/wp-content/uploads/2022/11/29beb004-368f-4fbd-9c6e-3c7d62c95792.jpeg" alt="" className="w-full h-full object-cover rounded-lg" />
			</div>
			<Features />
			<Waitlist />
			<Footer />
		</main>
	);
}

function Hero() {
	return (
		<div className="w-full lg:h-screen">
			<div className="px-6 md:px-12 lg:max-w-6xl xl:max-w-7xl mx-auto h-full grid lg:grid-cols-2 items-center gap-8 md:gap-16 lg:gap-8 py-6">
				<div className="text-white pt-16 md:pt-36 lg:pt-0">
					<h1 className="font-bold text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-center lg:text-left">Master Trading Safely: Simulate, Learn, and <span className="text-green-500">Profit</span></h1>
					<p className="text-xl text-center lg:text-left mt-4 md:mt-8 text-gray-200">Interactive learning and real time trading simulation at your fingertips</p>
					<div className="mt-8 flex justify-center lg:justify-start">
						<Link to="#waitlist" className="bg-[#B398B0] text-black capitalize px-8 py-4 rounded-lg">Get started now</Link>
					</div>
				</div>
				<div className=" h-full">
					<img src="/graph.jpg" alt="" className="w-full h-full rounded-lg" />
				</div>
			</div>
		</div>
	);
}

function HowItWorks() {
	let steps = [
		{
			title: 'Sign up',
			description: 'Create an account with us',
			illustration: <ProfileIllustration />
		},
		{
			title: 'Deposit',
			description: 'Deposit some amount that you will use to trade',
			illustration: <MoneyTransferIllustration />
		},
		{
			title: 'Trade',
			description: 'Trade for as long as you want in our simulated market',
			illustration: <BusinessDealIllustration />
		},
		{
			title: 'Withdraw',
			description: "When you're satisfied with the amount in your account you can withdraw very easily",
			illustration: <PaymentsIllustration />
		}
	];
	return (
		<section className="mt-24 md:mt-36 lg:mt-40 px-6 md:px-0 md:max-w-lg lg:max-w-xl mx-auto items-center">
			<div>
				<h2 className="font-semibold text-3xl lg:text-5xl text-center">How it works</h2>
				<p className="mt-8 text-xl text-center text-gray-400">It is very simple to trade in our platform. It's just 4 steps!</p>
				<ol className="mt-8 space-y-4">
					{steps.map((step, index) => (
						<li key={index} className="bg-[#293234] p-6 lg:p-12 rounded-lg grid grid-cols-4 gap-4 items-center">
							<div className="col-span-3">
								<div className="flex gap-4 items-center">
									<p className="w-10 h-10 rounded-full grid place-items-center bg-yellow-500 text-black">{index + 1}</p>
									<h3 className="text-xl font-semibold">{step.title}</h3>
								</div>
								<p className="mt-4 text-gray-400">{step.description}</p>
							</div>
							<div className="col-span-1">
								{step.illustration}
							</div>
						</li>
					))}
				</ol>
			</div>
			{/* <div className="mt-8 flex justify-center">
				<Link to="/" className="bg-[#B398B0] text-black capitalize px-8 py-4 rounded-lg">Get started now</Link>
			</div> */}
		</section>
	);
}

function Features() {
	let features = [
		{
			title: 'Realistic market simulation',
			description: 'Experience the thrill of trading with our realistic market simulation. Our platform mimics real-world market conditions, allowing you to practice and hone your trading skills without the financial risk. Dive into a dynamic environment where you can experiment with strategies and see how they perform in real-time.'
		},
		{
			title: 'Advanced risk management tools',
			description: 'Trade confidently with our advanced risk management tools. Our platform provides features like stop-loss orders, portfolio diversification suggestions, and risk assessment reports to help you minimize potential losses and make informed decisions. Learn to manage your risk like a professional trader.'
		},
		{
			title: 'Comprehensive educational resources',
			description: "Unlock your trading potential with our comprehensive educational resources. Access a wealth of tutorials, webinars, and articles designed to enhance your understanding of market dynamics, trading strategies, and financial instruments. Whether you're a beginner or an experienced trader, our resources cater to all skill levels"
		},
		{
			title: 'Friendly user interface',
			description: "Navigate our platform with ease using our intuitive, user-friendly interface. Designed with the trader in mind, our interface simplifies complex trading activities, making it easy for you to focus on what matters most – your trades. Enjoy a seamless trading experience with customizable dashboards and real-time data feeds."
		},
		{
			title: 'Track your performance',
			description: "Monitor your trading performance with detailed analytics and reports. Our platform provides in-depth performance tracking, helping you understand your strengths and areas for improvement. Use these insights to refine your strategies and achieve better trading outcomes."
		}
	];

	return (
		<section className="mt-24 md:mt-36 lg:mt-40 px-6 md:px-12 lg:max-w-6xl xl:px-0 mx-auto">
			<h2 className="font-semibold text-3xl lg:text-5xl text-center">Unlock the power of safe and realistic trading</h2>
			<p className="text-gray-400 mt-8 text-center text-xl">Discover a suite of features designed to enhance your trading skills and confidence</p>
			<ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
				{features.map((feature, index) => (
					<li key={index} className="bg-[#293234] p-6 lg:p-8 rounded-lg">
						<div>
							<h3 className="text-xl font-semibold text-yellow-500">{feature.title}</h3>
							<p className="mt-4 text-gray-300">{feature.description}</p>
						</div>
					</li>
				))}
			</ul>
			{/* <div className="mt-8 flex justify-center">
				<Link to="/" className="bg-[#B398B0] text-black capitalize px-8 py-4 rounded-lg">Get started now</Link>
			</div> */}
		</section>
	);
}

function Waitlist() {
	let actionData = useActionData();
	let navigation = useNavigation();

	let formRef = useRef(null);
	let mountedRef = useRef(false);
	let nameRef = useRef(null);

	let emailRef = useRef(null);


	console.log({ actionData });

	let isSubmitting = navigation.state === 'submitting';

	useEffect(() => {
		if (!isSubmitting) {
			console.log('Resetting...');
			formRef.current?.reset();
		}
	}, [isSubmitting]);

	return (
		<section id="waitlist" className="mt-24 md:mt-36 lg:mt-40 px-6 md:px-12 xl:px-0 lg:max-w-5xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-28 items-center">
			<div className="subscribe">
				<div aria-hidden={!!actionData?.id}>
					<h2 className="font-semibold text-3xl lg:text-5xl">Be among the first to try it out</h2>
					<p className="text-lg mt-4 text-gray-400">You will be the first to be notified when we launch</p>

					<Form
						method="post"
						replace
						className="mt-4"
						ref={formRef}
					>
						<fieldset className="space-y-6">
							<FormSpacer>
								<Label htmlFor="name" className="flex gap-2 items-center">Name {actionData?.fieldErrors?.name
									? <p className="text-red-500 text-sm">{actionData.fieldErrors.name}</p>
									: null
								}</Label>
								<Input
									ref={nameRef}
									type="text"
									name="name"
									id="name"
									placeholder="John Doe"
									className={`bg-gray-200 text-gray-800 focus-visible:ring focus-visible:ring-yellow-500 transition duration-300 ease-in-out ${actionData?.fieldErrors?.name ? 'border border-red-500' : ''}`}
								/>
							</FormSpacer>
							<FormSpacer>
								<Label htmlFor="email" className="flex gap-2 items-center">Email {actionData?.fieldErrors?.email
									? <p className="text-red-500 text-sm">{actionData.fieldErrors.email}</p>
									: null
								}</Label>
								<Input
									ref={emailRef}
									type="email"
									name="email"
									id="email"
									placeholder="johndoe@email.com"
									className={`bg-gray-200 text-gray-800 focus-visible:ring focus-visible:ring-yellow-500 transition duration-300 ease-in-out ${actionData?.fieldErrors?.email ? 'border border-red-500' : ''}`}
								/>

							</FormSpacer>
							<Button
								type="submit"
								name="_action"
								value="waitlist"
								className="w-full bg-brand-purple hover:bg-brand-light-purple transition-colors duration-300 ease-in-out text-black">
								{isSubmitting ? <span className="w-10"><ThreeDots /></span> : 'Join our waitlist'}
							</Button>
						</fieldset>
					</Form>
				</div>
				<div aria-hidden={!actionData?.id} className="text-center">
					<h2 className="font-semibold text-3xl lg:text-5xl">You're Subscribed!</h2>
					<p className="mt-4">Yow will be receive updates on your email</p>
					<div className="mt-8">
						<Link to="." preventScrollReset className="bg-brand-purple text-black rounded-lg px-6 py-3">Start over</Link>
					</div>
				</div>
			</div>
			<div>
				<WaitlistIllustration />
			</div>
		</section>
	);
}
function Footer() {
	let socialLinks = [
		{
			href: '',
			icon: <XIcon />
		},
		{
			href: '',
			icon: <InstagramIcon />
		},
		{
			href: '',
			icon: <TiktokIcon />
		},
		{
			href: '',
			icon: <FacebookIcon />
		}
	];

	return (
		<footer className="bg-yellow-500 text-black w-full mt-24 md:mt-36 lg:mt-40">
			<div className="py-6">
				<h2 className="text-center font-semibold text-2xl">Follow us on social media</h2>
				<ul className="flex gap-2 justify-center mt-4">
					{socialLinks.map((link, index) => (
						<li key={index} className="w-6">
							<a href={link.href} className=" hover:text-gray-500 transition ease-in-out duration-300">
								{link.icon}
							</a>
						</li>
					))}
				</ul>
			</div>
			<p className="bg-brand-black mt-4 text-center py-2 text-gray-200">Copyright &copy; {new Date().getFullYear()}</p>
		</footer>
	);
}