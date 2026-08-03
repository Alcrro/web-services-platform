import APIIcon from "@/shared/ui/icons/APIIcon";
import AwsIcon from "@/shared/ui/icons/AwsIcon";
import ExpressJsIcon from "@/shared/ui/icons/ExpressJsIcon";
import FlutterIcon from "@/shared/ui/icons/FlutterIcon";
import MongoDbIcon from "@/shared/ui/icons/MongoDbIcon";
import NextJsIcon from "@/shared/ui/icons/NextJsIcons";
import PostgreSQLIcon from "@/shared/ui/icons/PostgreSQLIcon";
import PythonIcon from "@/shared/ui/icons/PythonIcon";
import { JSX } from "react";

export const IconMapper: Record<string, JSX.Element> = {
  NextJS: <NextJsIcon />,
  ExpressJS: <ExpressJsIcon />,
  MongoDB: <MongoDbIcon />,
  PostgreSQL: <PostgreSQLIcon />,
  API: <APIIcon />,
  Flutter: <FlutterIcon />,
  aws: <AwsIcon />,
  python: <PythonIcon />,
};
