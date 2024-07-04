import { Form } from "@remix-run/react";
import FormSpacer from "~/components/FormSpacer";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";

export async function action() {
    return null;
}

export default function Signup() {
    return (
        <main className="bg-brand-black min-h-screen">
            <div className="px-6 md:px-12 xl:px-0 lg:max-w-6xl mx-auto h-full grid lg:grid-cols-2 gap-8">
                <div className="text-gray-200 lg:order-2 lg:py-12">
                    <h1 className="font-bold text-2xl lg:text-4xl">Signup</h1>
                    <Form method="post" className="mt-4">
                        <fieldset className="space-y-6">
                            <FormSpacer>
                                <Label htmlFor="first-name">First name</Label>
                                <Input
                                    type="text"
                                    name="first-name"
                                    id="first-name"
                                    placeholder="John"
                                    className="bg-transparent"
                                />
                            </FormSpacer>
                            <FormSpacer>
                                <Label htmlFor="last-name">Last name</Label>
                                <Input
                                    type="text"
                                    name="last-name"
                                    id="last-name"
                                    placeholder="Doe"
                                    className="bg-transparent"
                                />
                            </FormSpacer>
                            <FormSpacer>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    type="email"
                                    name="email"
                                    id="email"
                                    placeholder="johndoe@email.com"
                                    className="bg-transparent"
                                />
                            </FormSpacer>
                            <FormSpacer>
                                <Label htmlFor="phone">Phone</Label>
                                <Input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="0712 345 678"
                                    className="bg-transparent"
                                />
                            </FormSpacer>
                            <Button type="submit" className="w-full bg-brand-purple text-black">Sign up</Button>
                        </fieldset>
                    </Form>
                </div>
                <div className="lg:order-1">
                    <img
                        src="https://scandinavianmarkets.com/wp-content/uploads/2020/03/Professional-Trader.jpg"
                        alt=""
                        className="w-full h-full object-cover object-center rounded-lg"
                    />
                </div>
            </div>

        </main>
    );
}