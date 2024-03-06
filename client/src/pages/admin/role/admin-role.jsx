import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Box,
  useMediaQuery,
  useTheme,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { TextField, Typography, Unstable_Grid2 as Grid } from "@mui/material";
import Modal from "@mui/material/Modal";
import TablePagination from "@mui/material/TablePagination";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Http from "../../../utils/http";
import AddIcon from "@mui/icons-material/Add";
import { useForm, Controller } from "react-hook-form";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import EditIcon from "@material-ui/icons/Edit";
import PersonAddDisabledSharpIcon from "@material-ui/icons/PersonAddDisabledSharp";
import UserPage from "../../table/company/user-view";
import { da } from "@faker-js/faker";
// // ... Your rows data here

const CompanyManage = () => {
  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = () => {
    Http.get("/api/user/byrole/company")
      .then((data) => {
        setCompanies(data.data);
      })
      .catch((err) => {});
  };
  return (
    <>
      <UserPage companies={companies} getCompanies={getCompanies} />
    </>
  );
};

export default CompanyManage;