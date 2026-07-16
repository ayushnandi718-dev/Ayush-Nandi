"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ContactForm from "../ContactForm";
import { config } from "@/data/config";
import { SectionHeader } from "./section-header";
import SectionWrapper from "../ui/section-wrapper";
import Link from "next/link";
import { Button } from "../ui/button";
import { MessageCircle, Mail, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <SectionWrapper
      id="contact"
      className="min-h-screen max-w-7xl mx-auto"
    >
      <SectionHeader
        id="contact"
        className="relative mb-14"
        title={
          <>
            LET&apos;S WORK <br />
            TOGETHER
          </>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-4">
        {/* Left: Contact Form */}
        <Card className="bg-white/70 dark:bg-black/70 backdrop-blur-sm rounded-xl mt-10 md:mt-20">
          <CardHeader>
            <CardTitle className="text-4xl">Contact Form</CardTitle>
            <CardDescription>
              Drop your info here or reach out directly.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>

        {/* Right: Quick Contact Info */}
        <div className="flex flex-col gap-6 justify-center mt-10 md:mt-20">
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold">Get in Touch</h3>
            <p className="text-muted-foreground">
              Have a project in mind or just want to say hi? Feel free to reach
              out through any of the channels below.
            </p>
          </div>

          {/* WhatsApp */}
          <Link
            href="https://wa.me/919563316500"
            target="_blank"
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-green-500/50 hover:bg-green-500/5 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500/10 text-green-500 group-hover:bg-green-500/20 transition-colors">
              <MessageCircle size={24} />
            </div>
            <div>
              <p className="font-semibold">WhatsApp</p>
              <p className="text-sm text-muted-foreground">+91 9563316500</p>
            </div>
          </Link>

          {/* Email */}
          <Link
            href={`mailto:${config.email}`}
            className="flex items-center gap-4 p-4 rounded-xl border border-border hover:border-blue-500/50 hover:bg-blue-500/5 transition-all duration-300 group"
          >
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
              <Mail size={24} />
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p className="text-sm text-muted-foreground">{config.email}</p>
            </div>
          </Link>

          {/* Address */}
          <div className="flex items-center gap-4 p-4 rounded-xl border border-border">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-orange-500/10 text-orange-500">
              <MapPin size={24} />
            </div>
            <div>
              <p className="font-semibold">Location</p>
              <p className="text-sm text-muted-foreground">
                Alipurduar Court, Alipurduar,
                <br />
                West Bengal, India 736123
              </p>
            </div>
          </div>

          {/* Quick WhatsApp Button */}
          <Link href="https://wa.me/919563316500" target="_blank">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              <MessageCircle className="mr-2 h-4 w-4" />
              Message on WhatsApp
            </Button>
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
};
export default ContactSection;
