import React from 'react'
import { DocumentReportIcon, ReceiptTaxIcon, CollectionIcon, BadgeCheckIcon } from '@heroicons/react/outline'

const features = [
    {
        name: 'Sales and tax tracking',
        description:
            'Track all sales data -such as top menu items, busiest selling times, best-performing team members and profits and get detailed records for tax reporting purposes.',
        icon: ReceiptTaxIcon,
    },
    {
        name: 'Order management',
        description:
            'Easily manage orders, reservations, checks and menu items. Control refunds, voids and view order statuses.',
        icon: BadgeCheckIcon,
    },
    {
        name: 'Inventory management',
        description:
            'Knowing exactly how much product you have on hand will help you determine when and how much to reorder from your vendors.',
        icon: CollectionIcon,
    },
    {
        name: 'Reporting and customer data',
        description:
            "Track and filter your sales and customer data, you'll have access to a wealth of information to help you grow your business and make better marketing decisions.",
        icon: DocumentReportIcon,
    },
]

function Features() {
    return (
        <div className="py-12 bg-white hover:bg-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-base text-gray-600 font-semibold tracking-wide uppercase">Restaurant management system</h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        A better way to manage restaurant
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
                    Restaurant management systems help you manage sales, staff, inventory and more.
                    </p>
                </div>

                <div className="mt-10">
                    <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                        {features.map((feature) => (
                            <div key={feature.name} className="relative">
                                <dt>
                                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gray-500 text-white">
                                        <feature.icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                </dt>
                                <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}

export default Features
