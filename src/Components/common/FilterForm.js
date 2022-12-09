import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { COUNTRY } from '../../Constants/constant';
import { DatePicker } from 'shards-react';

export default function FilterForm({ FilterSubmit }) {

    const formik = useFormik({
        initialValues: {
            email: '',
            country: '',
            fromDate: '',
            toDate: '',
        },

        validationSchema: Yup.object({

            email: Yup.string().email('Invalid email address').required('Required'),
        }),

        onSubmit: values => {
            // alert(JSON.stringify(values, null, 2));
            FilterSubmit(values)
        },
    })


    return (
        <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input
                id="email"
                name="email"
                type="email"
                onChange={formik.handleChange}
                value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
            ) : null}
            <label htmlFor="country">Country</label>
            <select
                id="country"
                name="country"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.country}
            >
                <option className="d-none">Select Countries</option>
                {COUNTRY.map((countries) => {
                    return (
                        <option value={countries.name}>{countries.name}</option>
                    );
                })}
            </ select>
            <label htmlFor="fromDate">From Date</label>

            <DatePicker
                                className="form-control"
                                placeholderText="DD/MM/YYYY"
                                onChange={formik.handleChange}
                                value={formik.values.fromDate}
                            />
            {/* <input
                id="fromDate"
                name="fromDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.fromDate}
            /> */}
            <label htmlFor="toDate">To Date</label>


            <DatePicker
                                className="form-control"
                                placeholderText="DD/MM/YYYY"
                                onChange={formik.handleChange}
                                value={formik.values.toDate}
                            />
{/* 
            <input
                id="toDate"
                name="toDate"
                type="date"
                onChange={formik.handleChange}
                value={formik.values.toDate}
            /> */}

            <button type="submit">Submit</button>
        </form>
    )
}
