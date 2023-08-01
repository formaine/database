import React, { useMemo } from "react";
import { Container } from "reactstrap";
import TableContainer from "./TableContainer";
import "bootstrap/dist/css/bootstrap.min.css";
import { SelectColumnFilter } from "./filters";
// import census from "citysdk";
import { useQuery } from "react-query";

const PopTable = () => {
  const [dataTable, setDataTable] = React.useState([]);

  function censusPromise(args) {
    return new Promise(function (resolve, reject) {
      // census(args, function (err, json) {
      //   if (!err) {
      //     resolve(json);
      //   } else {
      //     reject(err);
      //   }
      // });
    });
  }

  function getCensusA() {
    return censusPromise({
      vintage: "2019",
      geoHierarchy: {
        state: "23",
        county: "*",
      },
      sourcePath: ["pep", "charagegroups"],
      values: ["NAME", "AGEGROUP", "POP"],
      predicates: {
        AGEGROUP: "30", // number range separated by `:`
      },
      statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414",
    });
  }

  const { data } = useQuery("test", getCensusA);

  React.useEffect(() => {
    if (!data) {
    } else {
      if (data) {
        setDataTable(data);
      }
    }
  }, [data]);

  const columns = useMemo(
    () => [
      {
        Header: "Area",
        accessor: "NAME",
        disableSortBy: true,
        Filter: SelectColumnFilter,
        filter: "equals",
      },
      {
        Header: "Population (15 to 44 years)",
        accessor: "POP",
        disableFilters: true,
        Cell: (props) => new Intl.NumberFormat().format(props.value),
      },
    ],
    []
  );

  return (
    <Container
      style={{ marginTop: 100, marginLeft: "inherit" }}
      className={"popTable"}
    >
      <TableContainer columns={columns} data={dataTable} />
    </Container>
  );
};

export default PopTable;
