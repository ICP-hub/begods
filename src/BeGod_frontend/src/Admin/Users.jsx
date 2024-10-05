import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Input,
  Box,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons"; // Import CloseIcon from Chakra UI
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useAuth } from "../utils/useAuthClient.jsx";
import { Principal } from "@dfinity/principal";
import { SkeletonTheme } from "react-loading-skeleton";

function Users() {
  const { backendActor } = useAuth();
  const [loading, setLoading] = useState(false);
  const [alluser, setalluser] = useState([]);
  const [principal, setprincipal] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // New state for search input

  const getallDUser = async () => {
    if (backendActor) {
      try {
        const result = await backendActor?.getAllUsers();
        console.log("getting all users", result);

        if (result && result.length > 0 && result[0].length > 0) {
          setalluser(result);
          const userPrincipalArray = result[0][0];
          const principalString = Principal.fromUint8Array(
            userPrincipalArray._arr
          ).toText();
          console.log(principalString);
          setprincipal(principalString);
        } else {
          console.log("No users found in the result");
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const loadStart = Date.now(); // Record the start time
      await getallDUser();
      const loadTime = Date.now() - loadStart;

      // Ensure that the loading spinner runs for at least 3 seconds
      const remainingTime = 3000 - loadTime;
      if (remainingTime > 0) {
        setTimeout(() => setLoading(false), remainingTime);
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filtered users based on the search term
  const filteredUsers = alluser.filter(
    (user) => user[3].toLowerCase().includes(searchTerm.toLowerCase()) // Assuming user[3] is the name
  );

  // Function to clear the search input
  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#282828">
      <div className="w-[90%] overflow-y-scroll pt-10 px-10 pb-8 h-screen no-scrollbar md:w-full lg:w-[90%] lg:pt-20">
        <Box
          color="white"
          className="flex flex-col items-center justify-center"
        >
          {/* Search Box */}
          <Box
            w={{ base: "90%", sm: "100%", md: "85%", "2xl": "90%" }}
            mx={{ base: "4%", sm: "8%", md: "7%", lg: "7%", "2xl": "10%" }}
            mt="5%"
            display="flex" // Added flex to align items horizontally
            alignItems="center" // Center the items vertically
          >
            {loading ? (
              <Skeleton height={45} width="100%" />
            ) : (
              <>
                <Input
                  placeholder="Search by Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
                  w="100%"
                  h="45px"
                  border="1px"
                  borderColor="gray.600"
                  bg="#161618"
                  color="white"
                  p="4"
                  _placeholder={{ color: "gray.400" }}
                />
                <IconButton
                  aria-label="Clear search"
                  icon={<CloseIcon />}
                  onClick={clearSearch}
                  ml={2}
                  colorScheme="red"
                  variant="outline"
                />
              </>
            )}
          </Box>

          {/* Table */}
          <Box
            w={{ base: "90%", sm: "100%", md: "85%", "2xl": "90%" }}
            mx={{ base: "4%", sm: "8%", md: "7%", lg: "7%", "2xl": "10%" }}
            mt="5%"
            className="whitespace-simple"
          >
            <TableContainer w={"100%"}>
              <Table
                variant="simple"
                border="1px solid transparent"
                rounded="md"
              >
                <Thead bg="#FCD37B">
                  <Tr>
                    <Th textAlign="center" color="black" p={4} fontSize="md">
                      Name
                    </Th>
                    <Th textAlign="center" color="black" p={4} fontSize="md">
                      Email
                    </Th>
                    <Th textAlign="center" color="black" p={4} fontSize="md">
                      Principal
                    </Th>
                    <Th textAlign="center" color="black" p={4} fontSize="md">
                      Details
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {loading
                    ? Array(5)
                        .fill("")
                        .map((_, index) => (
                          <Tr key={index}>
                            <Td>
                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: "10px",
                                }}
                              >
                                <Skeleton
                                  circle={true}
                                  height={30}
                                  width={30}
                                />
                                <Skeleton height={20} width="150px" />{" "}
                                {/* Name placeholder */}
                              </div>
                            </Td>
                            <Td>
                              <Skeleton height={20} width="80%" />
                            </Td>
                            <Td>
                              <Skeleton height={20} width="60%" />
                            </Td>
                            <Td>
                              <Skeleton height={20} width="40%" />
                            </Td>
                          </Tr>
                        ))
                    : filteredUsers.map((user, index) => (
                        <Tr
                          key={index}
                          bg={index % 2 === 0 ? "#333333" : "#282828444"}
                        >
                          <Td textAlign="center">
                            <div className="flex items-center justify-center gap-4">
                              <img
                                src="/image/admin.png"
                                alt=""
                                style={{
                                  width: "30px",
                                  height: "30px",
                                  borderRadius: "50%",
                                }}
                              />
                              {user[3]} {/* Actual Name */}
                            </div>
                          </Td>
                          <Td
                            textAlign="center"
                            wordBreak="break-all"
                            color="gray.200"
                          >
                            {user[4]}
                          </Td>
                          <Td textAlign="center" color="white.200">
                            {principal
                              ? `${principal.slice(0, 5)}...${principal.slice(
                                  principal.length - 6
                                )}`
                              : "No ID available"}
                          </Td>
                          <Td textAlign="center">
                            <Link
                              to={`/Admin/users/${user[2]}`}
                              state={{ alluser }}
                            >
                              <Button
                                size="sm"
                                border="1px"
                                borderColor="gray.500"
                                color="white"
                                bg="#161618"
                                _hover={{ bg: "#FCD37B", color: "black" }}
                              >
                                View
                              </Button>
                            </Link>
                          </Td>
                        </Tr>
                      ))}
                </Tbody>
              </Table>
            </TableContainer>

            {/* Pagination */}
            <Box
              mt="5%"
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                mr="2"
                bg="#161618"
                color="white"
                border="1px"
                borderColor="gray.500"
                _hover={{ bg: "black" }}
              >
                &lt;
              </Button>
              <Button
                bg="#FCD37B"
                color="black"
                border="1px"
                borderColor="black"
                _hover={{ bg: "#D4A849" }}
              >
                1
              </Button>
              <Button
                ml="2"
                bg="#161618"
                color="white"
                border="1px"
                borderColor="gray.500"
                _hover={{ bg: "black" }}
              >
                &gt;
              </Button>
            </Box>
          </Box>
        </Box>
      </div>
    </SkeletonTheme>
  );
}

export default Users;
