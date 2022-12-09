import React from "react";
import { Table, Form, Button, Dropdown } from "react-bootstrap";
import { Pagination, Icon } from "semantic-ui-react";
import { CSVLink, CSVDownload } from "react-csv";

export default function ImportCsv({ stateCsvData, file_name }) {
  return (
    <div className="import-btn d-flex justify-content-end mb-3">
      <Button variant="white">
        <CSVLink
          // asyncOnClick={true}
          data={stateCsvData && stateCsvData != undefined ? stateCsvData : [{}]}
          target="_blank"
          filename={`${
            file_name ? file_name.replace(" ", "_") : ""
          }_${new Date().toISOString()}.csv`}
          onClick={(event) => {
            return stateCsvData?.length > 0 ? true : false;
          }}
        >
          <Icon name="download" />
          Export as CSV
        </CSVLink>
      </Button>
    </div>
  );
  // }
}
