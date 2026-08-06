'use client';
import { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { courseApi } from "@/lib/redux/features/courseApi";
import { Skeleton } from 'boneyard-js/react'
import { Course } from "@/types/course";

export default function CoursesList() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);

    const { data, isLoading, error } = courseApi.useGetCoursesQuery(null);
    const courses: Course[] = Array.isArray(data?.data?.data) ? data.data.data : [];

    useEffect(() => {
        if (isLoading || error) return;

        const ctx = gsap.context(() => {
            // ── Heading: fade-up ──
            if (headingRef.current) {
                gsap.fromTo(
                    headingRef.current,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.7,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: headingRef.current,
                            start: "top 85%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }

            // ── Course cards: staggered scale-up ──
            const cards = gridRef.current?.querySelectorAll(".gsap-course-card");
            if (cards?.length) {
                gsap.fromTo(
                    cards,
                    { opacity: 0, y: 40, scale: 0.95 },
                    {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.6,
                        stagger: 0.08,
                        ease: "power2.out",
                        scrollTrigger: {
                            trigger: gridRef.current,
                            start: "top 80%",
                            toggleActions: "play none none reverse",
                        },
                    }
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [isLoading, error, courses.length]);

    if (error) return (
        <div className="flex justify-center items-center min-h-40">
            <p className="text-red-500 text-lg">Something went wrong. Please try again.</p>
        </div>
    );

    return (
        <div ref={sectionRef} className="container py-8">
            <h2 ref={headingRef} className="text-3xl font-medium text-gray-800 mb-8">All Courses</h2>

            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {isLoading && Array.from({ length: 8 }).map((_, i) => (
                    <CourseCard key={i} loading={true} />
                ))}
                {!isLoading && courses.map((course) => (
                    <div key={course.id} className="gsap-course-card">
                        <CourseCard course={course} loading={false} />
                    </div>
                ))}
            </div>
        </div>
    );
}

function CourseCard({ course, loading }: { course?: Course; loading: boolean }) {
    return (
        <Skeleton name="course-card" loading={loading}>
            <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col">
                <div className="relative">
                    <img
                        src={course?.thumbnail_url}
                        alt={course?.title}
                        loading="lazy"
                        className="w-full h-48 object-cover"
                    />
                    {course?.discount_percentage! > 0 && (
                        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
                            {course?.discount_percentage}% OFF
                        </span>
                    )}
                    {course?.is_free && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                            FREE
                        </span>
                    )}
                </div>
                <div className="p-4 flex flex-col flex-1">
                    <span className="text-xs text-brand font-semibold uppercase tracking-wide mb-1">
                        {course?.category?.name}
                    </span>
                    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 leading-snug">
                        {course?.title}
                    </h3>
                    <p className="text-xs text-gray-500 mb-3">
                        By <span className="font-medium text-gray-700">{course?.instructor?.name}</span>
                    </p>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
                        <span>⏱ {course?.duration_hours}h</span>
                        <span>📚 {course?.total_lectures} lectures</span>
                        <span>👥 {course?.total_students}</span>
                    </div>
                    <div className="flex gap-2 mb-4">
                        <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded capitalize">
                            {course?.level}
                        </span>
                        <span className="text-xs bg-brand-light text-brand px-2 py-1 rounded capitalize">
                            {course?.course_type}
                        </span>
                    </div>
                    <div className="flex-1" />
                    <div className="flex items-center justify-between mt-2">
                        <div>
                            {course?.is_free ? (
                                <span className="text-green-600 font-medium text-lg">Free</span>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span className="text-brand font-medium text-lg">
                                        ৳{course?.discount_price}
                                    </span>
                                    {course?.discount_percentage! > 0 && (
                                        <span className="text-gray-400 text-sm line-through">
                                            ৳{course?.price}
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                        <span className="text-xs text-yellow-500 font-semibold">
                            ⭐ {course?.avg_rating ? parseFloat(course.avg_rating).toFixed(1) : '0.0'}
                        </span>
                    </div>
                    <button className="mt-4 w-full bg-brand hover:bg-brand-hover text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-200">
                        Enroll Now
                    </button>
                </div>
            </div>
        </Skeleton>
    );
}
