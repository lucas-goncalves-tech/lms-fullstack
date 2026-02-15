import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableSkeleton() {
  return (
    <div className="hidden md:block">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[180px]">
              <Skeleton className="h-6" />
            </TableHead>
            <TableHead className="w-[200px]">
              <Skeleton className="h-6" />
            </TableHead>
            <TableHead>
              <Skeleton className="h-6" />
            </TableHead>
            <TableHead className="w-[80px] text-center">
              <Skeleton className="h-6" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={4}>
              <Skeleton className="h-6" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>
              <Skeleton className="h-6" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>
              <Skeleton className="h-6" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={4}>
              <Skeleton className="h-6" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
